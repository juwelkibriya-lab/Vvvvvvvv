// Credit : 乛 M𝆠፝֟R ཐི༏ཋྀ JU𝆠፝֟W𝆠፝֟ELꜛཐི༏ཋྀ࿐
// Version : 5.5.0
// Project : 🤖 MR JUWEL Telegram Bot — Made by MR JUWEL (বিডি বট টিম / BD Bot Team)
const U = require("../../MR_JUWEL/tgutil");
module.exports.config = {
  name: "report",
  version: "5.5.0",
  hasPermssion: 0,
  credits: "乛 M𝆠፝֟R ཐི༏ཋྀ JU𝆠፝֟W𝆠፝֟ELꜛཐི༏ཋྀ࿐",
  description: "সমস্যা/অভিযোগ বট-অ্যাডমিনকে জানান",
  commandCategory: "utility",
  usages: "<বার্তা>",
  cooldowns: 30,
  aliases: ["feedback","রিপোর্ট"]
};
const mid = (m) => Number(String(m).split(":").pop());

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;
  const txt = args.join(" ").trim();
  if (!txt) return api.sendMessage("📨 ব্যবহার: report আপনার বার্তা", threadID, messageID);
  const body = "📨 REPORT\n👤 " + (event.senderName || "") + " (" + event.senderID + ")\n💬 " + (event.isGroup ? "গ্রুপ " + threadID : "ইনবক্স") + "\n\n" + txt;
  let ok = 0; for (const id of global.config.ADMINBOT || []) { try { await api.sendMessage(body, id); ok++; } catch (_) {} }
  return api.sendMessage(ok ? "✅ আপনার বার্তা বট-অ্যাডমিনকে পাঠানো হয়েছে।" : "⚠️ অ্যাডমিনকে পাঠানো যায়নি (অ্যাডমিন বটকে অন্তত একবার /start দেননি)।", threadID, messageID);
};
