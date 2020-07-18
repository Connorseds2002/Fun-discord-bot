const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //!warn @daeshan <reason>
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("No can do pal!");
  let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  if(!wUser) return message.reply("Couldn't find them yo");
  if(wUser.hasPermission("MANAGE_MESSAGES")) return message.reply("They waaaay too kewl");
  let reason = args.join(" ").slice(22);
  let warns = JSON.parse(fs.readFileSync(`./warnings${message.guild.id}.json`, "utf8"));
  if (!warns){fs.writeFile(`./warnings${message.guild.id}.json`, JSON.stringify({}), (err) => {
      if (err) console.log(err);
    });}
  if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile(`./warnings${message.guild.id}.json`, JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

  let warnEmbed = new Discord.RichEmbed()
  .setDescription("Warns")
  .setAuthor(message.author.username)
  .setColor("#fc6400")
  .addField("Warned User", `<@${wUser.id}>`)
  .addField("Warned In", message.channel)
  .addField("Number of Warnings", warns[wUser.id].warns)
  .addField("Reason", reason);

  let warnchannel = message.guild.channels.find(`name`, "incidents");
  if(!warnchannel) return message.reply("Couldn't find incidents channel");

  warnchannel.send(warnEmbed);

  if(warns[wUser.id].warns == 3){
    let muterole = message.guild.roles.find(`name`, "muted");
    if(!muterole) return message.reply("You should create that muted role dude.");

    let mutetime = "1h";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> has been temporarily muted for ${mutetime}`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> has been unmuted.`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 4){
    let muterole = message.guild.roles.find(`name`, "muted");
    if(!muterole) return message.reply("You should create that muted role dude.");

    let mutetime = "1d";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> has been temporarily muted for ${mutetime}`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> has been unmuted.`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 5){
    let muterole = message.guild.roles.find(`name`, "muted");
    if(!muterole) return message.reply("You should create that muted role dude.");

    let mutetime = "1w";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> has been temporarily muted for ${mutetime}`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> has been unmuted.`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns == 6){
    let muterole = message.guild.roles.find(`name`, "muted");
    if(!muterole) return message.reply("You should create that muted role dude.");

    let mutetime = "2w";
    await(wUser.addRole(muterole.id));
    message.channel.send(`<@${wUser.id}> has been temporarily muted for ${mutetime}`);

    setTimeout(function(){
      wUser.removeRole(muterole.id)
      message.reply(`<@${wUser.id}> has been unmuted.`)
    }, ms(mutetime))
  }
  if(warns[wUser.id].warns >= 7){
    message.guild.member(wUser).ban(reason);
    message.reply(`<@${wUser.id}> has been banned.`)
    warns[wUser.id] = {
      warns: 0
    }
    fs.writeFile(`./warnings${message.guild.id}.json`, JSON.stringify(warns), (err) => {
      if (err) console.log(err)
    });
  }

}

module.exports.help = {
  name: "warn"
}
