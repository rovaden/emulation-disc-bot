const { Util } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Get ping for bot",

    async execute(message){
        const m = await message.channel.send("Ping?");
        m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms.`);
    }
}