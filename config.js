var config = {};

config.telegramToken = process.env.TELEGRAM_TOKEN;

config.activePlugins = ["ping", "roll", "set", "yt", "yp", "reddit", "google", "image"];

module.exports = config;