# Floating Chat Button Pattern

Reusable smooth chat trigger button for rkrk.io pages.

## The Pattern

### CSS — Gradients, not bouncing
- **Appear**: opacity 0→1 + translateY(16px→0), 0.8s ease. No scale, no bounce.
- **Fold**: trigger-label collapses via `max-width:0;opacity:0` over 0.5s. Button morphs to 48px circle with `border-radius:50%`. Easing: `cubic-bezier(0.25,0.1,0.25,1)`.
- **Glow**: a single `glow-in` keyframe that goes from subtle→bright→settled, 2s `ease-out forwards`. No looping.
- **Hover**: gentle scale(1.03) + glow intensifies via `::after` radial gradient overlay.
- **Panel**: `.open` class toggles `opacity:1;translateY(0)`. Double `requestAnimationFrame` for smooth entry.

### What NOT to do
- ❌ No `float-bob` or any looping motion animation — annoying
- ❌ No `scale` transitions during appear/fold — causes layout jank
- ❌ No `cubic-bezier(0.34,1.56,...)` overshoot — feels glitchy
- ❌ No direct style manipulation on opacity/transform — use CSS classes

### JS — Clean timing
```js
// Appear after 5s
setTimeout(() => { dock.classList.add('visible'); trigger.classList.add('glow'); }, 5000);
// Fold after 11s
setTimeout(() => { dock.classList.add('collapsed'); }, 11000);

// Toggle
function toggleChat() {
  dock.classList.remove('collapsed');
  if (chatOpen) {
    panel.style.display = 'flex';
    requestAnimationFrame(() => requestAnimationFrame(() => panel.classList.add('open')));
    trigger.classList.add('active');
  } else {
    panel.classList.remove('open');
    setTimeout(() => { panel.style.display = 'none'; }, 260);
    trigger.classList.remove('active');
  }
}
```

## Current Implementation
rkrk.io — `.floating-dock` + `#chatTrigger` + `#chatPanel`

### Post-Close Fold
After closing the chat panel, always re-collapse the button to emoji-only state:
```js
// On close:
setTimeout(function(){
  panel.style.display = 'none';
  dock.classList.add('collapsed');
}, 300);
```

## System Prompt Pattern

Every chatbot on rkrk.io must prepend a system prompt before the user's message. The prompt must:
1. Push Kee's contact: WeChat: REDACTED_WECHAT, WhatsApp: +44 7440 622158, email: user@example.com
2. Link product names to URLs: QuickLevel, Business English, IELTS with Kee, DynaSaurus, DynamOS
3. Instruct the AI to reply in the user's language

Implementation: prepend system instructions to the message body before sending to the API.

## Color Consistency

User message bubbles in KeeBot must use the brand gradient, not solid red:
```css
.chat-msg.user .chat-msg-content {
  background: linear-gradient(135deg, var(--purple), var(--pink));
  color: #fff;
}
```
Purple: #9F44D3 · Pink: #FF2442 — matches the floating trigger button gradient.
Never use `var(--red)` for chat bubbles. Always use the purple→pink gradient.

## Streaming & Social Links

### Text Streaming
Use character-by-character streaming for a live feel:
```js
function streamText(text, el, container, pos) {
  pos = pos || 0;
  if (pos >= text.length) return;
  el.classList.add('streaming');
  el.innerHTML = renderMd(text.substring(0, pos + 1));
  container.scrollTop = container.scrollHeight;
  var delay = text[pos] === ' ' ? 8 : text[pos] === '.' ? 40 : text[pos] === ',' ? 20 : 15;
  setTimeout(() => streamText(text, el, container, pos + 1), delay);
}
```

### Social Link Post-Processing
After receiving the AI response, post-process to convert mentions into clickable links:
- **WeChat**: Copy+jump button → green button that copies "REDACTED_WECHAT" then opens `weixin://`
- **WhatsApp**: Clickable link → `https://wa.me/447440622158`
- **Email**: Mailto link → `mailto:user@example.com`
- **Product names**: Markdown links in the system prompt handle these

### System Prompt Format
```
IMPORTANT RULES:
1) WeChat: REDACTED_WECHAT, WhatsApp: +44 7440 622158, Email: user@example.com
2) Product links: [QuickLevel](URL), [Business English](URL), etc.
3) Be warm, concise. Reply in user's language.
```
