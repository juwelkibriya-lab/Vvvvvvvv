// Credit : 乛 M𝆠፝֟R ཐི༏ཋྀ JU𝆠፝֟W𝆠፝֟ELꜛཐི༏ཋྀ࿐
// Version : 5.5.0
// Project : 🤖 MR JUWEL Telegram Bot — Made by MR JUWEL (বিডি বট টিম / BD Bot Team)
const U = require("../../MR_JUWEL/tgutil");
module.exports.config = {
  name: "lock",
  version: "5.5.0",
  hasPermssion: 1,
  credits: "乛 M𝆠፝֟R ཐི༏ཋྀ JU𝆠፝֟W𝆠፝֟ELꜛཐི༏ཋྀ࿐",
  description: "গ্রুপ লক: শুধু অ্যাডমিন লিখতে পারবে",
  commandCategory: "group",
  usages: "",
  cooldowns: 5,
  aliases: ["lockgroup"]
};
const mid = (m) => Number(String(m).split(":").pop());

module.exports.run = async ({ api, event }) => {
  const { threadID, messageID } = event;
  const on = false;
  try {
    await api.telegram("setChatPermissions", { chat_id: threadID, permissions: { can_send_messages: on, can_send_audios: on, can_send_documents: on, can_send_photos: on, can_send_videos: on, can_send_video_notes: on, can_send_voice_notes: on, can_send_polls: on, can_send_other_messages: on, can_add_web_page_previews: on, can_invite_users: true } });
    return api.sendMessage(on ? "🔓 গ্রুপ আনলক — সবাই লিখতে পারবে।" : "🔒 গ্রুপ লক — এখন শুধু অ্যাডমিন লিখতে পারবে।", threadID, messageID);
  } catch (e) { return api.sendMessage("❌ " + e.message + "\n(বটকে 'মেম্বার সীমিত করা' অধিকারসহ অ্যাডমিন করুন)", threadID, messageID); }
};
