// Credit : 乛 M𝆠፝֟R ཐི༏ཋྀ JU𝆠፝֟W𝆠፝֟ELꜛཐི༏ཋྀ࿐
// Version : 5.5.0
// Project : 🤖 MR JUWEL Telegram Bot — Made by MR JUWEL (বিডি বট টিম / BD Bot Team)
const U = require("../../MR_JUWEL/tgutil");
module.exports.config = {
  name: "afk",
  version: "5.5.0",
  hasPermssion: 0,
  credits: "乛 M𝆠፝֟R ཐི༏ཋྀ JU𝆠፝֟W𝆠፝֟ELꜛཐི༏ཋྀ࿐",
  description: "AFK মোড: কেউ মেনশন/রিপ্লাই করলে বট জানাবে আপনি ব্যস্ত",
  commandCategory: "utility",
  usages: "[কারণ] | (বন্ধ করতে আবার কোনো মেসেজ দিন)",
  cooldowns: 5
};
const mid = (m) => Number(String(m).split(":").pop());

if (!global.__afk) global.__afk = new Map();
module.exports.run = async ({ api, event, args }) => {
  const reason = args.join(" ").trim() || "ব্যস্ত";
  global.__afk.set(String(event.senderID), { reason, since: Date.now(), name: event.senderName || "" });
  return api.sendMessage("😴 AFK চালু: " + reason + "\nফিরে এসে যেকোনো মেসেজ দিলেই বন্ধ হবে।", event.threadID, event.messageID);
};
module.exports.handleEvent = async ({ api, event }) => {
  if (!event.body || event.type === "event") return;
  const me = String(event.senderID);
  const a = global.__afk.get(me);
  if (a && !/^[\/!.]?afk\b/i.test(event.body) && Date.now() - a.since > 5000) {
    global.__afk.delete(me);
    api.sendMessage("👋 স্বাগতম ফিরে আসায়, " + (event.senderName || "") + "! (" + U.fmtUp((Date.now() - a.since) / 1000) + " AFK ছিলেন)", event.threadID, event.messageID);
  }
  for (const id of Object.keys(event.mentions || {})) {
    const t = global.__afk.get(String(id));
    if (t && String(id) !== me) api.sendMessage("😴 " + (t.name || id) + " এখন AFK: " + t.reason + " (" + U.fmtUp((Date.now() - t.since) / 1000) + " ধরে)", event.threadID, event.messageID);
  }
};
