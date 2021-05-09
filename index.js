require('dotenv').config()
const fs = require('fs')
const Discord = require("discord.js");
const replies = require("./replies.json");
const Client = require('./client/Client');
const client = new Discord.Client();
const config = require("./config.json");
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
var layla = 0;
var alex = 0;
//minutes, seconds, milliseconds
var time = 5 * 60 * 1000;
var target =  Date.now();

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  client.user.setActivity(`Serving ${client.guilds.size} servers`);
  const gen = client.channels.cache.get('743330977195229267');
  // gen.send('return of the king');
  client.user.setPresence( {
    status: 'online',
    afk: false,
    activity: {
      name: "League of Legends",
      type: "PLAYING",
      url: "https://wol.gg/stats/na/teemotopop/"
    }
  })
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

// client.on("message", async message => {
//     if(message.author.bot) return;
//     if(message.content.indexOf(config.prefix) !== 0) return;
//     const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
//     const commandName = args.shift().toLowerCase();
//     const command = client.commands.get(commandName);

//     try {
// 		command.execute(message);
// 	} catch (error) {
// 		console.error(error);
// 		message.reply('There is no command called that!');
// 	}
// });

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.content.search("9") == -1) return;
    message.reply("https://youtu.be/tKaEVOsHFls");
});

client.on("message", async message => {
  if(message.author != 264218467182313472) return;
  if (message.channel != 743330977195229267) return;
  layla = layla + 1;
  console.log(layla);
  if (layla == 10){
    message.reply("layla is a dumbass");
    layla = 0;
  } else {
    return;
  }
})

client.on("message", async message => {
  if (message.channel != 743330977195229267) return;
  var current =  Date.now();
  if ( (target + time ) <= current){
    var number = Math.floor((Math.random() * replies.reply.length));
    message.reply(replies.reply[number]);
    target = current;
  } else {
    console.log((target + time) - current);
    return;
  }
}) 

client.on("message", async message => {
  if (message.author.bot) return;
  const args = message.content.trim().split(/ +/g);
  if (args[1] == "fuck" && args[2] == "you") message.reply("yes please");
  if (args.find(element => element == "Alex" || element == "alex")) {
    alex = alex + 1;
    if (alex != 5) return;
    var newmsg = [];
    for (i=0; i<args.length; i++){
      if (args[i] == "alex" || args[i] == "Alex") {
        newmsg.push("whore");
      } else {
        console.log("fuck");
        newmsg.push(args[i]);
      }
    }
    console.log(newmsg.toString());
    var sentence = newmsg.slice(0, newmsg.length).join(' ');
    message.reply("i think you mean " + '"' + sentence + '"');
    alex = 0;
  }
})

client.on("message", async message => {
  if (message.author != '473286235830353930') return;
  if (message.mentions.has('690960779528110176')){
    const args = message.content.trim().split(/ +/g);
    if (args[2] != null){
      message.reply("i like what you're saying. poggies");
    }
  }
})


client.login(process.env.BOT_TOKEN);