const Discord = require("discord.js");
module.exports.run = async (bot, message, args, points) => {
  let userData = points[message.author.id]
  message.reply(`You are currently level ${userData.level}, with ${userData.points} coins.`);

}
module.exports.help = {
  name: "coins"
}
