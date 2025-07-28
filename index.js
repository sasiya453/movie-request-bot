require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.BOT_TOKEN;
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;

if (!token || !ADMIN_CHAT_ID) {
  console.error('Missing BOT_TOKEN or ADMIN_CHAT_ID in .env file!');
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Send movie name');
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  if (msg.text && msg.text !== '/start') {
    const movie = msg.text.trim();
    bot.sendMessage(chatId, "We’ll add it soon ✅");
    const userInfo = `@${msg.from.username || msg.from.first_name} (id: ${msg.from.id})`;
    const forwardMsg = `🎬 Movie request: "${movie}"\nFrom: ${userInfo}`;
    bot.sendMessage(ADMIN_CHAT_ID, forwardMsg);
  }
});
