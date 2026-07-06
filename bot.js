import { chromium } from "playwright";
import { CONFIG } from "./config.js";
import { notify } from "./notifier.js";
import { runRetryLoop } from "./watcher.js";

let browser;
let page;

async function launchBrowser() {
  browser = await chromium.launch({
    headless: true, // IMPORTANT: keeps CAPTCHA manual
    slowMo: 50
  });

  const context = await browser.newContext();
  page = await context.newPage();
}

async function login() {
  await page.goto(CONFIG.loginUrl);

  await page.fill('input[name="username"]', CONFIG.username);
  await page.fill('input[name="password"]', CONFIG.password);

  await page.click('button[type="submit"]');

  await page.waitForTimeout(3000);

  await notify("✅ Logged in and session ready");
}

async function goToTeeSheet() {
  await page.goto(CONFIG.teeSheetUrl);
  await notify("⛳ Tee sheet loaded");
}

function isValidTime(text) {
  return true; // simplified placeholder — we refine per site DOM later
}

async function attemptBooking() {
  try {
    await page.reload();

    // Example placeholder selector logic (site-specific later)
    const times = await page.$$("button, a");

    for (const t of times) {
      const text = await t.innerText().catch(() => "");

      if (text && text.includes(":")) {
        if (isValidTime(text)) {
          await t.click();

          await page.waitForTimeout(1000);

          // fill players
          await notify(`🎯 Attempting booking at ${text}`);

          return {
            success: false, // will flip to true after CAPTCHA step
            details: `Selected ${text}`
          };
        }
      }
    }

    return { success: false };
  } catch (err) {
    console.log("Attempt error:", err.message);
    return { success: false };
  }
}

async function main() {
  await launchBrowser();
  await login();
  await goToTeeSheet();

  await notify("🟢 Bot armed — waiting for tee times");

  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);

  // wait until midnight
  await new Promise(r => setTimeout(r, midnight - now));

  await notify("🔥 MIDNIGHT HIT — STARTING BOOKINGS");

  await runRetryLoop(attemptBooking);

  await notify("🧍 Bot paused (likely CAPTCHA or manual step required)");
}

main();
