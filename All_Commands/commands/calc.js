// Credit : 乛 M𝆠፝֟R ཐི༏ཋྀ JU𝆠፝֟W𝆠፝֟ELꜛཐི༏ཋྀ࿐
// Version : 5.5.0
// Project : 🤖 MR JUWEL Telegram Bot — Made by MR JUWEL (বিডি বট টিম / BD Bot Team)
const U = require("../../MR_JUWEL/tgutil");
module.exports.config = {
  name: "calc",
  version: "5.5.0",
  hasPermssion: 0,
  credits: "乛 M𝆠፝֟R ཐི༏ཋྀ JU𝆠፝֟W𝆠፝֟ELꜛཐི༏ཋྀ࿐",
  description: "ক্যালকুলেটর (+ - * / % ^ ())",
  commandCategory: "utility",
  usages: "<হিসাব>",
  cooldowns: 2,
  aliases: ["hisab","math"]
};
const mid = (m) => Number(String(m).split(":").pop());

module.exports.run = async ({ api, event, args }) => {
  const { threadID, messageID } = event;
  let ex = args.join(" ").replace(/×/g, "*").replace(/÷/g, "/").replace(/\^/g, "**").replace(/,/g, "");
  if (!ex || !/^[0-9+\-*/%().\s*]+$/.test(ex) || ex.length > 100) return api.sendMessage("🧮 ব্যবহার: calc 12*(5+3)/2", threadID, messageID);
  try { const r = Function('"use strict";return (' + ex + ")")(); if (!Number.isFinite(r)) throw 0; return api.sendMessage("🧮 " + args.join(" ") + " = " + Math.round(r * 1e8) / 1e8, threadID, messageID); }
  catch (_) { return api.sendMessage("❌ হিসাবটা বুঝতে পারিনি।", threadID, messageID); }
};
