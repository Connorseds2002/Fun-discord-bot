const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
jmcSupport = new Discord.Collection();
setup = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});
fs.readdir("./jmcSupport/", (err , files) => {
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }
  jsfile.forEach((f, i) =>{
    let props = require(`./jmcSupport/${f}`);
    console.log(`${f} loaded!`);
    setup.set(props.help.name, props);
  });
})
fs.readdir("./setup/", (err , files) => {
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }
  jsfile.forEach((f, i) =>{
    let props = require(`./setup/${f}`);
    setup.set(props.help.name, props);
    console.log(`${f} loaded!`);
  });
})

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity(`Coding by Sedspvp in ${bot.guilds.size} guilds`, {type: "WATCHING"});

});

bot.on("message", async message => {
  let file = JSON.parse(fs.readFileSync("./setup.json" , "utf8"));
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  if(message.channel.id === "389421978068451331")return;
  let prefixs = JSON.parse(fs.readFileSync("./prefixes.json" , "utf8"));
  if(!prefixs[message.guild.id]){
	  prefixs[message.guild.id] ={
	  prefix: botconfig.prefix
	  };
  }
  prefix = prefixs[message.guild.id].prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
        if(file[message.guild.id]){
          let coins = `./coins${message.guild.id}.json`
          let points = JSON.parse(fs.readFileSync(coins , "utf8"));
          if (!points[message.author.id])
            points[message.author.id] = {
              points: 0,
              level: 0
          };
          if(points[message.author.id].level >= 2){
            points[message.author.id].points++;
          }
          if(points[message.author.id].level >= 5){
            points[message.author.id].points++;
          }
          if(points[message.author.id].level >= 10){
            points[message.author.id].points++;
          }
          if(points[message.author.id].level >= 20){
            points[message.author.id].points++;
          }
          if(points[message.author.id].level >= 40){
            points[message.author.id].points++;
          }
          if(points[message.author.id].level >= 80){
            points[message.author.id].points++;
          }
          if(points[message.author.id].level >= 160){
            points[message.author.id].points++;
          }
          if(points[message.author.id].level >= 220){
            points[message.author.id].points++;
          }
          if(points[message.author.id].level >= 440){
            points[message.author.id].points++;
          }
          if(points[message.author.id].level >= 880){
            points[message.author.id].points++;
          }
          if(points[message.author.id].level >= 1600){
            points[message.author.id].points++;
          }
          points[message.author.id].points++;
          let userPoints = points[message.author.id].points;
          let curLevel = Math.floor(0.3 * Math.sqrt(userPoints));
          let userLevel = points[message.author.id].level;
          if(userLevel < curLevel) {
            // Level up!
            points[message.author.id].level++;
          }
          if(commandfile){
          commandfile.run(bot,message,args,points,coins);
          console.log(message.guild + ` ` + cmd);
        }
        if(message.guild.id === "417434877298737153"){
          let command = jmcSupport.get(cmd.slice(prefix.length));
          if (command) command.run(bot,message,args,points);
        }
        fs.writeFile(coins, JSON.stringify(points), (err) => {
          if (err) console.error(err)
        });
        }else{
          let setupCommand = setup.get(cmd.slice(prefix.length));
          if(setupCommand){
            setupCommand.run(bot,message,args,file);
          }else {
              message.guild.owner.send(`Please to this commands ${prefix}setup so users in the ${message.guild.name} can do commands`)
          }
        }
});
bot.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the ${member.guild.name} server, ${member}`);
  try{
    member.send(`Welcome user you have joined the ${member.guild.name} server`);
  }catch(e){
    if(e)return console.log(e);
    return
  }
});

bot.login(tokenfile.token);
