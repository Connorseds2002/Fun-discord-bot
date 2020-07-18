const discord = require('discord.js');
const fs = require('fs');
module.exports.run = async (bot, message, args , points, coins) => {
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("I am sorry but this command can only be done by an admin and highter!!");
  let Puser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if (!Puser) return message.reply("Couldn't find user.");
  let userPoints = points[Puser.id]
  if(!userPoints)points[Puser.id] = {
    points:0,
    level:0
  };
  let Ncoin = args.join(" ").slice(22);
  points[Puser.id] = {
    level: userPoints.level,
    points: userPoints.points - Ncoin
  };
  fs.writeFile(coins, JSON.stringify(points), (err) => {
    if (err) console.error(err)
  });

  message.reply(`${Puser}, has lost ${parseInt(Ncoin)} coins from there account on this guild`)
}
module.exports.help = {
  name: "removecoins"
}
