// Credit : 乛 M𝆠፝֟R ཐི༏ཋྀ JU𝆠፝֟W𝆠፝֟ELꜛཐི༏ཋྀ࿐
// Version : 5.5.0
// Project : 🤖 MR JUWEL Telegram Bot — Made by MR JUWEL (বিডি বট টিম / BD Bot Team)
const U = require("../../MR_JUWEL/tgutil");
module.exports.config = {
  name: "goodbye",
  version: "5.5.0",
  hasPermssion: 1,
  credits: "乛 M𝆠፝֟R ཐི༏ཋྀ JU𝆠፝֟W𝆠፝֟ELꜛཐི༏ཋྀ࿐",
  description: "কেউ গ্রুপ ছাড়লে/বাদ পড়লে বিদায় বার্তা — on/off",
  commandCategory: "group",
  usages: "on | off",
  cooldowns: 3,
  aliases: ["bye"]
};
const mid = (m) => Number(String(m).split(":").pop());

module.exports.run = async ({ api, event, args, Threads }) => {
  const { threadID, messageID } = event;
  const a = String(args[0] || "").toLowerCase();
  const t = await Threads.getData(threadID); t.data = t.data || {};
  if (!["on", "off"].includes(a)) return api.sendMessage("👋 বিদায়-বার্তা এখন: " + (t.data.goodbye ? "চালু ✅" : "বন্ধ ❌") + "\nব্যবহার: goodbye on | off", threadID, messageID);
  t.data.goodbye = a === "on"; await Threads.setData(threadID, { data: t.data });
  return api.sendMessage("👋 বিদায়-বার্তা " + (a === "on" ? "চালু ✅" : "বন্ধ ❌"), threadID, messageID);
};
module.exports.handleEvent = async ({ api, event, Threads }) => {
  if (event.logMessageType !== "log:unsubscribe") return;
  const d = event.logMessageData || {};
  if (String(d.leftParticipantFbId) === String(api.getCurrentUserID())) return;
  const t = await Threads.getData(event.threadID);
  if (!(t.data && t.data.goodbye)) return;
  const how = d.removedBy ? "⛔ " + d.removedBy.name + " তাকে সরিয়েছেন" : "🚪 নিজে গ্রুপ ছেড়ে গেছেন";
  return api.sendMessage("╭━━━━━━━━━━━━━━━━━━━╮\n      👋 𝗚𝗢𝗢𝗗𝗕𝗬𝗘\n╰━━━━━━━━━━━━━━━━━━━╯\n👤 " + (d.leftName || d.leftParticipantFbId) + "\n" + how + "\n💔 ভালো থাকবেন।", event.threadID);
};
