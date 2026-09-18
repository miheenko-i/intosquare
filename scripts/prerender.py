"""Offline build fallback. Requires Python + Playwright + Chromium. No network access."""
import os, sys
from pathlib import Path
from playwright.sync_api import sync_playwright

def main():
    input_file, output_file = map(Path, sys.argv[1:3])
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, executable_path=os.environ.get("CHROMIUM_EXECUTABLE", "/usr/bin/chromium"), args=["--no-sandbox"])
        page = browser.new_page(viewport={"width":1440, "height":1000}, reduced_motion="reduce")
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        page.route("https://**/*", lambda route: route.abort())
        page.set_content(input_file.read_text(), wait_until="domcontentloaded")
        page.locator("#pricing").wait_for()
        page.wait_for_timeout(100)
        if errors:
            raise RuntimeError("Pre-render failed: " + "; ".join(errors))
        markup = page.locator("#root").inner_html()
        if len(markup) < 5000:
            raise RuntimeError("Pre-render returned incomplete content")
        output_file.write_text(markup)
        browser.close()

if __name__ == "__main__":
    main()
