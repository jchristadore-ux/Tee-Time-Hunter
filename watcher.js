import { notify } from "./notifier.js";
import { CONFIG } from "./config.js";

export function waitUntil(targetTime) {
  return new Promise(resolve => {
    const now = Date.now();
    const delay = targetTime - now;
    setTimeout(resolve, Math.max(0, delay));
  });
}

export async function runRetryLoop(actionFn) {
  const start = Date.now();

  while (Date.now() - start < CONFIG.retryDurationMs) {
    try {
      const result = await actionFn();

      if (result?.success) {
        await notify(`🚨 TEE TIME FOUND!\n${result.details}`);
        return result;
      }
    } catch (e) {
      console.log("Retry error:", e.message);
    }

    await new Promise(r => setTimeout(r, 2500));
  }

  await notify("❌ No tee time secured in retry window.");
}
