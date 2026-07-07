#!/usr/bin/env python3
"""Capture feedback long image — DOM-only, no API calls, no DB entries."""
from playwright.sync_api import sync_playwright
from PIL import Image
import time

URL = 'http://localhost:8090/adult-english/questionnaire/'
OUTPUT = '/Users/agentii/.openclaw/workspace/teaching-research/adult-english/questionnaire/feedback-screenshot.png'

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 780, 'height': 1200})
    page.goto(URL, wait_until='networkidle')
    time.sleep(0.5)

    # Directly show confirm + feedback via DOM — NO form submit, NO API call
    page.evaluate('''() => {
        document.getElementById('q-form').style.display = 'none';
        document.getElementById('confirm').style.display = 'block';
        document.getElementById('thanks-step').style.display = 'none';
        document.getElementById('feedback-content').style.display = 'block';
    }''')
    time.sleep(0.5)

    # Full page screenshot
    tmp = '/tmp/fb-full.png'
    page.screenshot(path=tmp, full_page=True)

    # Crop to feedback-content area
    y = page.evaluate('document.getElementById("feedback-content").getBoundingClientRect().top + window.scrollY')
    h = page.evaluate('document.getElementById("feedback-content").scrollHeight')

    img = Image.open(tmp)
    cropped = img.crop((0, int(y), img.width, int(y + h)))
    cropped.save(OUTPUT)
    print(f'Done: {cropped.size[0]}x{cropped.size[1]} (no DB entry created)')
    browser.close()
