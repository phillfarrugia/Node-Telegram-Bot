var config = {};

config.telegramToken = process.env.TELEGRAM_TOKEN;

config.activePlugins = ["ping", "roll", "set", "yt", "yp", "google", "image"];

module.exports = config;