var config = {};

config.telegramToken = process.env.TELEGRAM_TOKEN;

config.activePlugins = ["ping", "image", "set", "youtube", "roll", "google"];

module.exports = config;