export const CONFIG = {
  loginUrl: process.env.LOGIN_URL,
  teeSheetUrl: process.env.TEE_SHEET_URL,

  username: process.env.USERNAME,
  password: process.env.PASSWORD,

  course: "Minerals",

  players: 3,

  timeWindowStart: "08:00",
  timeWindowEnd: "09:30",

  retryDurationMs: 5 * 60 * 1000, // 5 minutes

  telegramEnabled: !!process.env.TELEGRAM_BOT_TOKEN,
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN,
  telegramChatId: process.env.TELEGRAM_CHAT_ID
};
