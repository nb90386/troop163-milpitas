// Shared launcher: uses the Playwright-managed Chromium already on this machine.
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import os from 'node:os';
const fallback = `${os.homedir()}/Library/Caches/ms-playwright/chromium_headless_shell-1254/chrome-headless-shell-mac-arm64/chrome-headless-shell`;
export function launch() {
  const opts = {};
  if (process.env.PW_CHROMIUM) opts.executablePath = process.env.PW_CHROMIUM;
  else if (fs.existsSync(fallback)) opts.executablePath = fallback;
  return chromium.launch(opts);
}
