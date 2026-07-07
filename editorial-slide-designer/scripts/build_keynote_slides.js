#!/usr/bin/env osascript -l JavaScript

// Build editorial slide deck in Apple Keynote
// Usage: osascript -l JavaScript build_keynote_slides.js

var app = Application('Keynote');
app.activate();

// ===== Color palette =====
var colors = {
  bg:     { red: 0.0196, green: 0.0196, blue: 0.0627, alpha: 1.0 },  // #050510
  dark:   { red: 0.0392, green: 0.0392, blue: 0.1176, alpha: 1.0 },  // #0A0A1E
  card:   { red: 0.0706, green: 0.0706, blue: 0.1569, alpha: 1.0 },  // #121228
  purple: { red: 0.6235, green: 0.2667, blue: 0.8275, alpha: 1.0 },  // #9F44D3
  pDim:   { red: 0.4196, green: 0.1843, blue: 0.5569, alpha: 1.0 },  // #6B2F8E
  pink:   { red: 0.9098, green: 0.3020, blue: 0.6275, alpha: 1.0 },  // #E84DA0
  gold:   { red: 0.9608, green: 0.6510, blue: 0.1373, alpha: 1.0 },  // #F5A623
  teal:   { red: 0.0000, green: 0.7490, blue: 0.7490, alpha: 1.0 },  // #00BFBF
  coral:  { red: 1.0000, green: 0.2706, blue: 0.3765, alpha: 1.0 },  // #FF4560
  white:  { red: 1.0000, green: 1.0000, blue: 1.0000, alpha: 1.0 },
  light:  { red: 0.9098, green: 0.8784, blue: 0.9412, alpha: 1.0 },  // #E8E0F0
  muted:  { red: 0.5333, green: 0.4667, blue: 0.6667, alpha: 1.0 },  // #8877AA
};

// ===== Helpers =====
function addSlide(doc) {
  var slide = app.Slide.bymaking({
    new: 'slide',
    at: doc.slides.end
  });
  slide.backgroundColor = colors.bg;
  return slide;
}

function addTxt(slide, text, x, y, w, h, font, size, color, bold, italic, align) {
  var tf = app.TextItem.bymaking({
    new: 'text item',
    at: slide.textItems.end
  });
  tf.objectText = text;
  tf.position = { x: x, y: y };
  tf.width = w;
  tf.height = h;
  if (font) tf.fontName = font;
  tf.fontSize = size;
  if (color) tf.fontColor = color;
  if (bold !== undefined) tf.bold = bold;
  if (italic !== undefined) tf.italic = italic;
  if (align) tf.paragraphAlignment = align;
  return tf;
}

function txt(slide, text, x, y, w, h, size, color, opts) {
  var opt = opts || {};
  return addTxt(slide, text, x, y, w, h, opt.font || 'Helvetica', size, color, opt.bold, opt.italic, opt.align);
}

function header(slide, text, x, y, w, size, color, bold) {
  return txt(slide, text, x, y, w, size, color, { bold: bold !== false, font: 'Helvetica' });
}

function body(slide, text, x, y, w, size, color) {
  return txt(slide, text, x, y, w, size, color, { bold: false });
}

function addRect(slide, x, y, w, h, fillColor, strokeColor, strokeWidth, radius) {
  var shape = app.Shape.bymaking({
    new: 'shape',
    at: slide.shapes.end
  });
  shape.position = { x: x, y: y };
  shape.width = w;
  shape.height = h;
  if (fillColor) {
    shape.fillType = 1; // solid fill
    shape.fillColor = fillColor;
  }
  if (strokeColor) {
    shape.strokeType = 1;
    shape.strokeColor = strokeColor;
    shape.strokeWidth = strokeWidth || 1;
  }
  if (radius) shape.radius = radius;
  return shape;
}

function card(slide, x, y, w, h, fill) {
  return addRect(slide, x, y, w, h, fill || colors.card, null, 0, 12);
}

function cardStroke(slide, x, y, w, h, stroke, fill) {
  return addRect(slide, x, y, w, h, fill || colors.card, stroke, 1.5, 12);
}

function imgPlaceholder(slide, x, y, w, h, label) {
  addRect(slide, x, y, w, h, colors.dark, colors.muted, 1, 8);
  txt(slide, label, x + 10, y + h/2 - 20, w - 20, 40, 14, colors.muted, { italic: true, align: 'center' });
}

function sep(slide, x, y, w, color) {
  addRect(slide, x, y, w, 2, color);
}

function pageNum(slide, num) {
  txt(slide, num + '/14', 1820, 1020, 80, 24, 9, colors.muted, { font: 'Helvetica' });
}

// ===== Build the deck =====
function buildDeck() {
  var doc = app.Document.bymaking({
    new: 'document',
    withProperties: {
      width: 1920,
      height: 1080,
      slideNumbersVisible: false
    }
  });

  // ===== SLIDE 1: TITLE =====
  var s = addSlide(doc);
  addTxt(s, "THE COCOON", 620, 280, 800, 80, 'Helvetica', 68, colors.white, true, false, 'left');
  addTxt(s, "&", 760, 370, 200, 60, 'Helvetica', 48, colors.purple, true, false, 'center');
  addTxt(s, "THE CATALYST", 620, 440, 800, 80, 'Helvetica', 68, colors.gold, true, false, 'left');
  sep(s, 620, 540, 300, colors.gold);
  body(s, "Kee Lee  |  TEDxChengdu  ·  May 1, 2026", 620, 560, 600, 16, colors.muted);
  // Portrait placeholder
  imgPlaceholder(s, 60, 140, 480, 480, "Kee's Portrait\nCinematic Side-Lit");
  pageNum(s, 1);

  // ===== SLIDE 2: THE COCOON =====
  s = addSlide(doc);
  imgPlaceholder(s, 0, 0, 1152, 1080, "Classroom — Bird's Eye\nStudents in a grid");
  card(s, 1180, 40, 700, 1000);
  header(s, "THE COCOON", 1220, 80, 600, 28, colors.white, true);
  header(s, "The Information Cocoon", 1220, 140, 600, 36, colors.gold, true);
  body(s, "Teacher → Content Bottleneck", 1220, 220, 600, 20, colors.white);
  body(s, "Student → Passive Consumer", 1220, 260, 600, 20, colors.white);
  sep(s, 1220, 320, 600, colors.coral);
  header(s, "Drowning in data.", 1220, 340, 600, 22, colors.coral, true);
  header(s, "Starving for understanding.", 1220, 380, 600, 22, colors.teal, true);
  pageNum(s, 2);

  // ===== SLIDE 3: THE SHIFT =====
  s = addSlide(doc);
  card(s, 40, 40, 920, 1000);
  header(s, "THE SHIFT", 80, 80, 400, 28, colors.white, true);
  header(s, "AI arrived.", 80, 140, 800, 48, colors.white, true);
  body(s, "Schools terrified of cheating", 80, 230, 800, 20, colors.white);
  body(s, "Teachers terrified of irrelevance", 80, 266, 800, 20, colors.white);
  body(s, "I was terrified too", 80, 302, 800, 20, colors.white);
  sep(s, 80, 360, 600, colors.gold);
  header(s, "Prompt engineering > AI itself", 80, 390, 800, 36, colors.gold, true);
  header(s, "A supercomputer without the right question\n= a very expensive paperweight", 80, 470, 800, 18, colors.coral, true);
  imgPlaceholder(s, 1000, 40, 880, 1000, "Abstract AI\nNode grid network");
  pageNum(s, 3);

  // ===== SLIDE 4: EVOLUTION =====
  s = addSlide(doc);
  cardStroke(s, 40, 40, 440, 960, colors.pDim);
  header(s, "TEACHER", 60, 80, 400, 36, colors.coral, true);
  body(s, "Content Provider", 60, 160, 400, 18, colors.white);
  body(s, "Competing with AI", 60, 196, 400, 18, colors.white);
  body(s, "Bottleneck of knowledge", 60, 232, 400, 18, colors.white);
  
  imgPlaceholder(s, 540, 80, 380, 640, "Metamorphosis\nPerson into light");
  header(s, "→", 530, 400, 80, 60, colors.gold, true);
  
  cardStroke(s, 960, 40, 520, 960, colors.gold);
  header(s, "LEARNING", 980, 80, 480, 30, colors.purple, true);
  header(s, "ARCHITECT", 980, 120, 480, 30, colors.purple, true);
  body(s, "Strategist  ·  Architect  ·  Coach", 980, 180, 480, 18, colors.white);
  body(s, "AI is not perfect.", 980, 260, 480, 18, colors.teal);
  body(s, "That's why the human", 980, 286, 480, 18, colors.teal);
  body(s, "role must evolve.", 980, 312, 480, 18, colors.teal);
  pageNum(s, 4);

  // ===== SLIDE 5: PAPERWEIGHT =====
  s = addSlide(doc);
  imgPlaceholder(s, 40, 40, 640, 1000, "Person holding\nbrick + phone");
  body(s, "You can hand someone", 760, 160, 700, 22, colors.white);
  addTxt(s, "a supercomputer...", 760, 200, 700, 36, 'Helvetica', 30, colors.white, false, true);
  body(s, "But if they don't know", 760, 270, 700, 22, colors.white);
  addTxt(s, "how to ask the right questions...", 760, 310, 700, 22, colors.white, false, true);
  sep(s, 760, 380, 200, colors.muted);
  body(s, "it's just a very", 760, 420, 700, 20, colors.white);
  header(s, "expensive paperweight.", 760, 460, 800, 48, colors.coral, true);
  pageNum(s, 5);

  // ===== SLIDE 6: DynamOS + R.U.A. =====
  s = addSlide(doc);
  imgPlaceholder(s, 1580, 40, 300, 300, "Brain /\nneural network");
  header(s, "DynamOS", 60, 60, 700, 48, colors.gold, true);
  body(s, "A Learning OS for the AI Era", 60, 130, 700, 18, colors.white);
  body(s, "Churns out magic based on one core concept:", 60, 170, 800, 16, colors.muted);
  
  // R circle
  addRect(s, 220, 400, 200, 200, colors.coral, null, 0, 100);
  addTxt(s, "R", 290, 460, 60, 80, 'Helvetica', 48, colors.white, true, false, 'center');
  
  // U circle
  addRect(s, 860, 400, 200, 200, colors.teal, null, 0, 100);
  addTxt(s, "U", 930, 460, 60, 80, 'Helvetica', 48, colors.white, true, false, 'center');
  
  // A circle
  addRect(s, 1500, 400, 200, 200, colors.gold, null, 0, 100);
  addTxt(s, "A", 1570, 460, 60, 80, 'Helvetica', 48, colors.white, true, false, 'center');
  
  // Labels
  body(s, "Recognize", 260, 620, 120, 24, colors.white);
  body(s, "Understand", 900, 620, 120, 24, colors.white);
  body(s, "Apply", 1540, 620, 120, 24, colors.white);
  
  // Connection lines
  addRect(s, 420, 498, 440, 4, colors.muted);
  addRect(s, 1060, 498, 440, 4, colors.muted);
  pageNum(s, 6);

  // ===== SLIDE 7: RECOGNIZE =====
  s = addSlide(doc);
  addRect(s, 120, 100, 160, 160, colors.coral, null, 0, 80);
  addTxt(s, "R", 180, 150, 40, 60, 'Helvetica', 48, colors.white, true, false, 'center');
  header(s, "ECOGNIZE", 320, 120, 600, 48, colors.white, true);
  
  card(s, 60, 320, 900, 320);
  body(s, "Ask AI to identify the gap", 100, 360, 800, 20, colors.white);
  body(s, "MFP = Meaning  ·  Form  ·  Pronunciation", 100, 410, 800, 18, colors.teal);
  addTxt(s, "The art of asking the right question", 100, 460, 800, 18, 'Helvetica', 18, colors.gold, false, true);
  
  imgPlaceholder(s, 1020, 40, 860, 1000, "Student comparing\ntextbook + phone");
  pageNum(s, 7);

  // ===== SLIDE 8: UNDERSTAND =====
  s = addSlide(doc);
  addRect(s, 100, 100, 160, 160, colors.teal, null, 0, 80);
  addTxt(s, "U", 160, 150, 40, 60, 'Helvetica', 48, colors.white, true, false, 'center');
  header(s, "NDERSTAND", 300, 120, 700, 48, colors.white, true);
  
  card(s, 60, 320, 1200, 420);
  body(s, "Suggestion", 100, 370, 300, 22, colors.light);
  addTxt(s, "→", 420, 370, 60, 22, 'Helvetica', 22, colors.muted, false, false, 'center');
  addTxt(s, "Banter", 500, 370, 300, 22, 'Helvetica', 22, colors.white, true, false);
  addTxt(s, "→", 820, 370, 60, 22, 'Helvetica', 22, colors.muted, false, false, 'center');
  addTxt(s, "Threat", 900, 370, 300, 22, 'Helvetica', 22, colors.coral, true, false);
  sep(s, 100, 430, 1100, colors.muted);
  body(s, "AI can explain quantum physics like a 5-year-old or a PhD student.", 100, 460, 1100, 18, colors.white);
  header(s, "Understanding is adjusting that dial.", 100, 510, 700, 20, colors.gold, true);
  pageNum(s, 8);

  // ===== SLIDE 9: APPLY =====
  s = addSlide(doc);
  imgPlaceholder(s, 1060, 0, 860, 1080, "Action —\npracticing, coding, building");
  addRect(s, 100, 100, 160, 160, colors.gold, null, 0, 80);
  addTxt(s, "A", 160, 150, 40, 60, 'Helvetica', 48, colors.white, true, false, 'center');
  header(s, "PPLY", 300, 120, 600, 48, colors.white, true);
  
  card(s, 60, 320, 880, 400);
  // R ⇄ A cycle
  addRect(s, 140, 400, 100, 100, colors.coral, null, 0, 50);
  addTxt(s, "R", 170, 420, 40, 60, 'Helvetica', 36, colors.white, true, false, 'center');
  addTxt(s, "⇄", 260, 430, 60, 40, 'Helvetica', 30, colors.gold, true, false, 'center');
  addRect(s, 320, 400, 100, 100, colors.gold, null, 0, 50);
  addTxt(s, "A", 350, 420, 40, 60, 'Helvetica', 36, colors.white, true, false, 'center');
  
  body(s, "Find the gap. Analyse it. Practice.", 80, 540, 800, 20, colors.white);
  body(s, "AI generates practice tasks based on your gap.", 80, 580, 800, 18, colors.teal);
  pageNum(s, 9);

  // ===== SLIDE 10: BOOKS ANALOGY =====
  s = addSlide(doc);
  imgPlaceholder(s, 60, 40, 840, 1000, "Warm library\nbook stack");
  card(s, 960, 60, 700, 960);
  addTxt(s, "When books appeared, did people", 1000, 140, 620, 40, 'Helvetica', 28, colors.white, false, true);
  addTxt(s, "try to hide them?", 1000, 190, 620, 40, 'Helvetica', 28, colors.white, false, true);
  sep(s, 1000, 260, 200, colors.muted);
  body(s, "Stop treating AI like a", 1000, 310, 620, 22, colors.white);
  body(s, "cheating device.", 1000, 350, 620, 22, colors.white);
  body(s, "Start treating it like a", 1000, 410, 620, 20, colors.white);
  header(s, "cognitive exoskeleton.", 1000, 450, 700, 36, colors.gold, true);
  pageNum(s, 10);

  // ===== SLIDE 11: META-REVEAL =====
  s = addSlide(doc);
  header(s, "THE META-REVEAL", 60, 40, 600, 28, colors.white, true);
  imgPlaceholder(s, 60, 120, 1800, 680, "REAL AI Conversation Screenshot\nPrompt → Speech Pipeline");
  header(s, "Everything you've experienced today was co-architected with an AI assistant.", 60, 840, 1800, 20, colors.teal, true);
  body(s, "Human strategist  +  AI computational engine.", 60, 880, 800, 18, colors.white);
  pageNum(s, 11);

  // ===== SLIDE 12: THE VISION =====
  s = addSlide(doc);
  header(s, "THE VISION", 60, 40, 600, 28, colors.white, true);
  
  // Tier 1
  cardStroke(s, 120, 140, 1200, 100, colors.coral);
  addTxt(s, "One Prompt", 140, 155, 600, 40, 'Helvetica', 24, colors.coral, true, false);
  body(s, "A single structured prompt that follows the R.U.A. framework", 140, 195, 1000, 18, colors.light);
  
  // Arrow
  addTxt(s, "⭳", 700, 250, 60, 40, 'Helvetica', 24, colors.muted, true, false, 'center');
  
  // Tier 2
  cardStroke(s, 160, 310, 1080, 100, colors.purple);
  addTxt(s, "One Agent", 180, 325, 600, 40, 'Helvetica', 24, colors.purple, true, false);
  body(s, "An AI agent that embodies the R.U.A. method as its core logic", 180, 365, 1000, 18, colors.light);
  
  // Arrow
  addTxt(s, "⭳", 700, 420, 60, 40, 'Helvetica', 24, colors.muted, true, false, 'center');
  
  // Tier 3
  cardStroke(s, 200, 480, 960, 100, colors.gold);
  addTxt(s, "One Button", 220, 495, 600, 40, 'Helvetica', 24, colors.gold, true, false);
  body(s, "R.U.A. — a learning OS built into any interface", 220, 535, 920, 18, colors.light);
  pageNum(s, 12);

  // ===== SLIDE 13: CALL TO ACTION =====
  s = addSlide(doc);
  imgPlaceholder(s, 60, 60, 520, 920, "Kee —\nhands open, face lit");
  addRect(s, 620, 40, 1260, 1000, null, colors.gold, 1.5, 8);
  
  header(s, "Stop.", 660, 120, 500, 60, colors.coral, true);
  header(s, "Become the Architect.", 660, 210, 800, 60, colors.gold, true);
  header(s, "Let AI handle the data.", 660, 320, 600, 36, colors.teal, true);
  header(s, "Let us handle the humanity.", 660, 370, 600, 36, colors.pink, true);
  sep(s, 660, 440, 400, colors.muted);
  addTxt(s, "Learning is learning how to learn.", 660, 480, 800, 24, 'Helvetica', 20, colors.white, false, true);
  pageNum(s, 13);

  // ===== SLIDE 14: CLOSING =====
  s = addSlide(doc);
  // Butterfly (simple decorative shapes)
  addRect(s, 920, 240, 80, 80, colors.gold, null, 0, 40);
  addRect(s, 880, 210, 40, 60, colors.gold, null, 0, 20);
  addRect(s, 1000, 210, 40, 60, colors.gold, null, 0, 20);
  
  addTxt(s, "Learning is learning how to learn.", 360, 380, 1200, 50, 'Helvetica', 36, colors.gold, true, false, 'center');
  addTxt(s, "Thank you.", 660, 480, 600, 60, 'Helvetica', 48, colors.white, true, false, 'center');
  body(s, "Kee Lee  ·  TEDxChengdu  ·  May 1, 2026", 660, 560, 600, 14, colors.muted);
  pageNum(s, 14);

  // Export to PPTX
  var outPath = Path('/Users/hermitclaw/.openclaw/workspace/tedx-slides-v6.pptx');
  doc.export({
    to: outPath,
    as: 'Microsoft PowerPoint'
  });
  
  console.log("✓ Deck exported: tedx-slides-v6.pptx");
  console.log("  Slides: " + doc.slides.length);
  return doc;
}

try {
  buildDeck();
} catch(e) {
  console.log("Error: " + e.message);
}
