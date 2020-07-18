const Discord = require("discord.js");
const fs = require("fs");
module.exports.run = async (bot, message, args) => {
	if(!message.member.hasPerission("MANAGE_SERVR"))return message.reply("no can do pall")
}
module.exports.help = {
	name: "prefix"
}