// Credit : 乛 M𝆠፝֟R ཐི༏ཋྀ JU𝆠፝֟W𝆠፝֟ELꜛཐི༏ཋྀ࿐
// Version : 5.5.0
// Project : 🤖 MR JUWEL Telegram Bot — Made by MR JUWEL (বিডি বট টিম / BD Bot Team)
const U = require("../../MR_JUWEL/tgutil");
module.exports.config = {
  name: "setwelcome",
  version: "5.5.0",
  hasPermssion: 1,
  credits: "乛 M𝆠፝֟R ཐི༏ཋྀ JU𝆠፝֟W𝆠፝֟ELꜛཐི༏ཋྀ࿐",
  description: "নিজের ওয়েলকাম লেখা সেট করুন ({name} {username} {id} {group} {count} {how} {adder} {prefix})",
  commandCategory: "group",
  usages: "<লেখা> | reset",
  cooldowns: 3
};
const mid = (m) => Number(String(m).split(":").pop());

module.exports.run = async ({ api, event, args, Threads }) => {
  const { threadID, messageID } = event;
  const t = await Threads.getData(threadID); t.data = t.data || {};
  const txt = args.join(" ").trim();
  if (!txt) return api.sendMessage("✏️ ব্যবহার: setwelcome আপনার লেখা\nচলবে: {name} {username} {id} {group} {count} {how} {adder} {prefix}\nআগের মতো করতে: setwelcome reset", threadID, messageID);
  if (txt.toLowerCase() === "reset") delete t.data.welcomeText; else t.data.welcomeText = txt.slice(0, 900);
  await Threads.setData(threadID, { data: t.data });
  return api.sendMessage(txt.toLowerCase() === "reset" ? "✅ ডিফল্ট ওয়েলকাম ফিরেছে।" : "✅ নতুন ওয়েলকাম সেট হয়েছে।", threadID, messageID);
};
