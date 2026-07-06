import fetch from "node-fetch";
import { CONFIG } from "./config.js";

export async function notify(message) {
  console.log("[NOTIFY]", message);

  if (!CONFIG.telegramEnabled) return;

  const url = `https://api.telegram.org/bot${CONFIG.telegramBotToken}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CONFIG.telegramChatId,
      text: message
    })
  }).catch(err => console.error("Telegram error:", err));
}
