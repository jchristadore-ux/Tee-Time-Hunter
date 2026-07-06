# Tee Time Hunter Bot

## What this does
- Logs into tee sheet
- Waits for midnight tee time release
- Instantly attempts booking
- Retries for 5 minutes if needed
- Sends Telegram alerts
- Stops at CAPTCHA for manual completion

## Required Railway ENV VARS

LOGIN_URL=
TEE_SHEET_URL=
USERNAME=
PASSWORD=

TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=

## Deploy
1. Push to GitHub
2. Connect Railway
3. Add env variables
4. Deploy
