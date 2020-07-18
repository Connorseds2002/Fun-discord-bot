const Discord = require('discord.js');
const fs = require("fs");
module.exports.run = async (bot, message, args) => {
  let ticket = JSON.parse(fs.readFileSync(`./ticket${message.guild.id}.json`));
  if(!ticket)ticket={
    ticket: 0,
    role: "staff",
    channel: "support"
  }
  let role = message.guild.roles.find(`name`, ticket.role);
  message.guild.createChannel(`ticket-${ticket.ticket}`)
  .then(channel => {
    let guild = channel.guild
    let ticket = guild.channels.find(`name` , ticket.channel);
    channel.setParent(ticket)
    channel.overwritePermissions(message.author, {
      SEND_MESSAGES : true,
      READ_MESSAGES : true
    })
    let role = guild.roles.find(`name`, ticket.role);
    channel.overwritePermissions(role, {
      SEND_MESSAGES : true,
      READ_MESSAGES : true
    })
    let role2 = guild.roles.find(`name`, "@everyone");
    channel.overwritePermissions(role2, {
      SEND_MESSAGES : false,
      READ_MESSAGES : false
    })
    channel.send(`${role}, this ticket is requires your attention. ${message.author}, please describe your problem.`);
  }).catch(console.error);
  ticket.ticket++;
  fs.writeFile(`./tickets${message.guild.id}.json` , JSON.stringify(ticket) , (err) => {
    if (err) console.error(err);
  })
}
module.exports.help = {
  name: "ticket"
}
