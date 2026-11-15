import { defineConfig, devices } from '@playwright/test'
import fs from 'node:fs'
import os from 'node:os'

// Reuse a locally installed Playwright Chromium when the exact build isn't present.
const local = `${os.homedir()}/Library/Caches/ms-playwright/chromium_headless_shell-1254/chrome-headless-shell-mac-arm64/chrome-headless-shell`
const executablePath = process.env.PW_CHROMIUM ?? (fs.existsSync(local) ? local : undefined)

export default defineConfig({
  testDir: 'tests',
  timeout: 60_000,
  fullyParallel: true,
  reporter: [['list']],
  use: {
    baseURL: process.env.BASE_URL ?? 'http://localhost:3163',
    launchOptions: executablePath ? { executablePath } : {},
  },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'], viewport: { width: 390, height: 844 } } },
  ],
  webServer: process.env.BASE_URL
    ? undefined
    : { command: 'npm run start -- --port 3163', url: 'http://localhost:3163', reuseExistingServer: true, timeout: 120_000 },
})
