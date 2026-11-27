// Credit : 乛 M𝆠፝֟R ཐི༏ཋྀ JU𝆠፝֟W𝆠፝֟ELꜛཐི༏ཋྀ࿐
// Version : 5.5.0
// Project : 🤖 MR JUWEL Telegram Bot — Made by MR JUWEL (বিডি বট টিম / BD Bot Team)
const U = require("../../MR_JUWEL/tgutil");
module.exports.config = {
  name: "welcome",
  version: "5.5.0",
  hasPermssion: 1,
  credits: "乛 M𝆠፝֟R ཐི༏ཋྀ JU𝆠፝֟W𝆠፝֟ELꜛཐི༏ཋྀ࿐",
  description: "নতুন সদস্য এলে সুন্দর স্বাগত বার্তা (ছবি, মেম্বার সংখ্যা, কে অ্যাড করেছে) — on/off",
  commandCategory: "group",
  usages: "[on|off]",
  cooldowns: 3
};
const mid = (m) => Number(String(m).split(":").pop());

const esc = (s) => String(s || "");
const DEFAULT_TPL = [
  "╭━━━━━━━━━━━━━━━━━━━╮",
  "      🌸 𝗪𝗘𝗟𝗖𝗢𝗠𝗘 🌸",
  "╰━━━━━━━━━━━━━━━━━━━╯",
  "👤 নাম: {name}",
  "🔗 ইউজারনেম: {username}",
  "🆔 আইডি: {id}",
  "━━━━━━━━━━━━━━━━━━━━",
  "🏠 গ্রুপ: {group}",
  "👥 মেম্বার: {count} জন (আপনি {count}-তম)",
  "{how}",
  "━━━━━━━━━━━━━━━━━━━━",
  "📜 কমান্ড দেখতে লিখুন: {prefix}help",
  "💖 গ্রুপের নিয়ম মেনে চলবেন, ভালো থাকবেন!",
].join("\n");

module.exports.run = async ({ api, event, args, Threads }) => {
  const sub = String(args[0] || "").toLowerCase();
  const t = await Threads.getData(event.threadID);
  t.data = t.data || {};
  if (sub !== "on" && sub !== "off") return api.sendMessage("👋 ওয়েলকাম এখন: " + (t.data.welcome === false ? "বন্ধ ❌" : "চালু ✅") + "\nবদলাতে: welcome on / welcome off\n✏️ নিজের লেখা: setwelcome", event.threadID, event.messageID);
  t.data.welcome = sub === "on";
  await Threads.setData(event.threadID, { data: t.data });
  api.sendMessage(sub === "on" ? "✅ ওয়েলকাম চালু হয়েছে।" : "❌ ওয়েলকাম বন্ধ হয়েছে।", event.threadID, event.messageID);
};

module.exports.handleEvent = async ({ api, event, Threads }) => {
  if (event.logMessageType !== "log:subscribe") return;
  const tid = event.threadID;
  const d = event.logMessageData || {};
  const botId = String(api.getCurrentUserID());
  const people = d.addedParticipants || [];
  const P = (global.config && global.config.PREFIX) || "/";
  const t = await Threads.getData(tid);
  const cfg = t.data || {};

  // বটকে নিজেকে গ্রুপে অ্যাড করা হলে — পরিচিতি
  if (people.some((p) => String(p.userFbId) === botId)) {
    const by = d.addedBy ? d.addedBy.name : "";
    return api.sendMessage([
      "╭━━━━━━━━━━━━━━━━━━━╮",
      "   🤖 ধন্যবাদ আমাকে অ্যাড করার জন্য!",
      "╰━━━━━━━━━━━━━━━━━━━╯",
      by ? "➕ অ্যাড করেছেন: " + by : "",
      "📜 কমান্ড দেখতে: " + P + "help",
      "⚠️ আমাকে গ্রুপের অ্যাডমিন করে দিন, তাহলে সবার লেখা (যেমন 'বট') ও সব ফিচার কাজ করবে।",
      "👑 বট: " + (global.config.BOTNAME || "MR JUWEL BOT"),
    ].filter(Boolean).join("\n"), tid);
  }
  if (cfg.welcome === false) return;

  let count = "?";
  try { count = await api.telegram("getChatMemberCount", { chat_id: tid }); } catch (_) {}
  const group = d.groupTitle || (await api.getThreadInfo(tid).catch(() => ({}))).threadName || "এই গ্রুপ";
  for (const p of people.filter((x) => !x.isBot)) {
    const how = p.selfJoin || !d.addedBy
      ? "🔗 লিংক/অনুরোধের মাধ্যমে জয়েন করেছেন"
      : "➕ অ্যাড করেছেন: " + d.addedBy.name + " (" + d.addedBy.id + ")";
    const tpl = cfg.welcomeText || DEFAULT_TPL;
    const text = tpl
      .replace(/{name}/g, esc(p.fullName)).replace(/{username}/g, p.username ? "@" + p.username : "নেই")
      .replace(/{id}/g, p.userFbId).replace(/{group}/g, group).replace(/{count}/g, count)
      .replace(/{how}/g, how).replace(/{adder}/g, d.addedBy ? d.addedBy.name : "—").replace(/{prefix}/g, P);
    let sent = false;
    try {
      const ph = await api.telegram("getUserProfilePhotos", { user_id: Number(p.userFbId), limit: 1 });
      const fid = ph && ph.photos && ph.photos[0] && ph.photos[0][ph.photos[0].length - 1].file_id;
      if (fid && text.length <= 1024) { await api.telegram("sendPhoto", { chat_id: tid, photo: fid, caption: text }); sent = true; }
    } catch (_) {}
    if (!sent) await api.sendMessage(text, tid);
  }
};
