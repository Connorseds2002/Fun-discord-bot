const Discord = require("discord.js");
const fs = require('fs');
module.exports.run = async (bot, message, args,  file) => {
  if(!message.author.username === message.guild.owner.user.username)return message.reply(`this command can only be done by ${message.guild.owner}`);
  if(!file[message.guild.id]){
    file[message.guild.id] = {
    }
  }
  message.guild.createChannel(`support`, `category`)
  fs.writeFile("./setup.json", JSON.stringify(file), (err) => {
    if (err) console.error(err)
  });
  f = {}
  fs.writeFile(`./coins${message.guild.id}.json`, JSON.stringify(f), (err) => {
    if (err) console.error(err)
  });
  fs.writeFile(`./warnings${message.guild.id}.json`, JSON.stringify(f), (err) => {
    if (err) console.error(err)
  });
  fs.writeFile(`./ticket${message.guild.id}.json` , JSON.stringify(f) , (err) => {
    if (err) console.error(err);
  })
  message.reply(`Guild is now setup amd user on this guild can use the commands`)
  message.author.send(`${message.guild.name} has now been setup to see what commands can be done do this !help command`)
}
module.exports.help = {
  name: "setup"
}
