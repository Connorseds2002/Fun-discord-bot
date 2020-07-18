const discord = require('discord.js');
module.exports.run = async (bot, message, args) => {
  let mUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!mUser) return message.reply("Couldn't find them yo");
  let pmMessage = args.join(" ").slice(22);
  try{
    await mUser.send(pmMessage + `\nmessage from ${message.author.tag}`)
  }catch(e){
    await message.channel.send(`${mUser} we tryed to dm you but it faled this is the messsage the user was trying to send you ${pmMessage} this message was sent to you from ${message.author}`)
  }
}
module.exports.help = {
  name: "pm"
}
