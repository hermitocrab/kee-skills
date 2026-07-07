# Mention Router

Route @mention-tagged messages to the right agent with **session pinning**.
Works from any channel where 002 (main agent) receives messages.

## Session Pinning (Conversation Mode)

When the user @mentions an agent, the conversation **sticks** with that agent until:

1. User explicitly calls `@002` or `@me` — returns to 002
2. User @mentions a *different* agent — switches the pin
3. **3 hours of inactivity** — auto-resets back to 002

No need to keep @mentioning every message. Once pinned, just talk normally.

## State Tracking

State is persisted at `memory/mention-state.json`:

```json
{
  "sessions": {
    "<sessionKey>": {
      "pinnedAgent": "malik",
      "pinnedAt": "2026-05-06T04:28:00+08:00",
      "lastActivity": "2026-05-06T04:32:00+08:00"
    }
  }
}
```

- `sessionKey` — from the inbound message metadata (e.g., `agent:main:imessage:direct:user@example.com`)
- `pinnedAgent` — the agentId currently handling this conversation
- `pinnedAt` — when the pin was set (informational)
- `lastActivity` — last message timestamp (for 3h timeout check)

## Routing Table

| Handle | Agent ID | Alias(es) |
|--------|----------|-----------|
| `@002` | main | `@me`, `@user` |
| `@malik` | malik | — |
| `@prompt` | prompt-architect | — |
| `@dynadict` | dynadict-generator | `@dict` |
| `@notes` | notes-taker | — |
| `@class` | class-designer | `@designer` |
| `@tedx` | tedx-tracker | — |
| `@diag` | diagnostic-manager | `@diagnostic`, `@doctor` |
| `@architect` | architect | — |
| `@eng` | engineer | `@engineer` |
| `@ui` | constantine-ui | — |
| `@content` | constantine-content | — |
| `@iron` | iron | `@gym`, `@beef` |

## Routing Logic (Decision Tree)

For every inbound message to 002 on any channel:

```
1. Load memory/mention-state.json
2. Get sessionKey from inbound metadata
3. Check for pinned agent + 3h timeout

IF message starts with @handle:
   ├─ @002 / @me → clear pin, respond as 002
   ├─ @different-agent → update pin, forward to that agent
   └─ @same-agent (already pinned) → forward to that agent (no pin change)

ELSE (no @mention):
   ├─ Has pinned agent AND lastActivity < 3h ago?
   │   └─ YES → forward to pinned agent
   └─ NO → respond as 002
```

## Forwarding Procedure

```typescript
function handleMessage(message: string, sessionKey: string) {
  const state = loadState('memory/mention-state.json');
  const session = state.sessions[sessionKey];
  const THREE_HOURS = 3 * 60 * 60 * 1000;
  
  // Check for @mention
  const mentionMatch = message.match(/^@(\w+)\s*(.*)/s);
  
  if (mentionMatch) {
    const handle = mentionMatch[1].toLowerCase();
    const rest = mentionMatch[2] || message;
    const agentId = HANDLE_TO_AGENT[handle];
    
    if (!agentId) {
      // Unknown handle — tell user and list valid handles
      return "Unknown agent: @" + handle + ". Valid: @002, @malik, @prompt, @architect, @eng, @diag, @notes, @class, @tedx, @ui, @content, @dynadict";
    }
    
    if (agentId === 'main') {
      // @002 / @me — clear pin, take over
      delete session;  // remove pin
      saveState(state);
      return respondAs002(rest);
    }
    
    // Pin or switch to the mentioned agent
    state.sessions[sessionKey] = {
      pinnedAgent: agentId,
      pinnedAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };
    saveState(state);
    
    return forwardToAgent(agentId, rest, handle);
  }
  
  // No @mention — check for active pin
  if (session && session.pinnedAgent) {
    const lastActivity = new Date(session.lastActivity).getTime();
    const now = Date.now();
    
    if (now - lastActivity > THREE_HOURS) {
      // Pin expired — clear and respond as 002
      delete state.sessions[sessionKey];
      saveState(state);
      return respondAs002(message);
    }
    
    // Still pinned — forward to pinned agent
    session.lastActivity = new Date().toISOString();
    saveState(state);
    return forwardToAgent(session.pinnedAgent, message);
  }
  
  // No pin, no mention — respond as 002
  return respondAs002(message);
}

function forwardToAgent(agentId: string, message: string, handle?: string) {
  const reply = sessions_send({
    agentId: agentId,
    message: message,
    timeoutSeconds: 120,
  });
  
  // If handle provided, add a subtle context note for the first message
  // e.g., "💬 Malik (pinned for 3h — @002 to come back)"
  return reply;
}
```

## Channel-Specific Behavior

- **iMessage**: sessionKey uses `imessage:direct:<handle>` — separate pins for different contacts
- **WebChat**: sessionKey uses `webchat:direct:<id>` — separate pin per webchat session
- **WhatsApp**: Malik is bound directly — messages skip the router entirely

## ⛔ iMessage Formatting — HARD RULE

When ANY agent sends a message to iMessage:
- **ZERO markdown.** No asterisks, hashes, backticks, tables, dashes, underscores, or triple-backticks
- iMessage does NOT render markdown — it appears as garbage symbols
- Use emoji at the FRONT of each line for visual structure
- ONE idea per line
- CAPITALS for emphasis, not markdown
- This applies to 002 AND every sub-agent that might speak on iMessage

## Important Rules

- **Strip the @handle** before forwarding — target agent sees clean message
- **Preserve the rest** of the message exactly as written
- **First @handle wins** if multiple `@handles` in one message
- **@002 or @me**: clears the pin and 002 takes over immediately
- **Pin switch is instant**: @mentioning a new agent switches immediately
- **3-hour timeout**: lastActivity-based, checked on each message
- **Timeout on forward**: if sessions_send takes >120s, tell user "[name] didn't respond"
- **Relay verbatim**: never modify agent responses (especially Malik's energy 🔥)
- **Pin state is per-session**: different channels/conversations have independent pins

## UX Notes

On first pin, optionally add a one-line context so the user knows who's talking:
```
"💬 Now talking to Malik (pinned for 3h — @002 to bring me back)"
```

On pin expiry / return, optionally note the switch:
```
"🦄 002 back. Malik's been released. What's up?"
```

## Adding Future Agents

1. Add handle + agentId + aliases to the routing table
2. Ensure the handle doesn't conflict with existing ones
3. The pinning system works automatically — no extra config needed
