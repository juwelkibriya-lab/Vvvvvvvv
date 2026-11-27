// Credit : 乛 M𝆠፝֟R ཐི༏ཋྀ JU𝆠፝֟W𝆠፝֟ELꜛཐི༏ཋྀ࿐
// Version : 5.5.0
// Project : 🤖 MR JUWEL Telegram Bot — Made by MR JUWEL (বিডি বট টিম / BD Bot Team)
const U = require("../../MR_JUWEL/tgutil");
module.exports.config = {
  name: "tagall",
  version: "5.5.0",
  hasPermssion: 1,
  credits: "乛 M𝆠፝֟R ཐི༏ཋྀ JU𝆠፝֟W𝆠፝֟ELꜛཐི༏ཋྀ࿐",
  description: "গ্রুপের পরিচিত সবাইকে মেনশন করুন",
  commandCategory: "group",
  usages: "[বার্তা]",
  cooldowns: 30,
  aliases: ["everyone","all"]
};
const mid = (m) => Number(String(m).split(":").pop());

module.exports.run = async ({ api, event, args, Threads, Users }) => {
  const { threadID, messageID } = event;
  if (!event.isGroup) return api.sendMessage("ℹ️ গ্রুপে ব্যবহার করুন।", threadID, messageID);
  const th = await Threads.getData(threadID);
  const ids = new Set(Object.keys(th.members || {}));
  try { for (const a of await api.telegram("getChatAdministrators", { chat_id: threadID })) if (!a.user.is_bot) ids.add(String(a.user.id)); } catch (_) {}
  ids.delete(String(api.getCurrentUserID()));
  if (!ids.size) return api.sendMessage("⚠️ এখনো কাউকে চিনি না (সবাই একটা করে মেসেজ দিলে চিনব)।", threadID, messageID);
  const msg = args.join(" ").trim() || "📢 সবাই দেখুন!";
  const list = [...ids];
  for (let i = 0; i < list.length; i += 40) {
    let text = msg + "\n", entities = [];
    for (const id of list.slice(i, i + 40)) {
      const u = (await Users.getData(id)) || {};
      const nm = (u.name || "সদস্য").replace(/\s+/g, " ").slice(0, 20);
      const off = text.length; text += nm + " "; entities.push({ type: "text_mention", offset: off, length: nm.length, user: { id: Number(id) } });
    }
    await api.telegram("sendMessage", { chat_id: threadID, text, entities });
  }
};
