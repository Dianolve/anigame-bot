const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const client = new Client();
fin = {};
currentInteraction = false;

try {
    const data = fs.readFileSync("config.json", "utf-8");
    const jsonData = JSON.parse(data);
    init(jsonData);
} catch (error) {
    console.error("Error reading JSON file:", error);
}

client.on('ready', async () => {
  console.log(`${client.user.username} is ready!`);
  const channelgfit = client.channels.cache.get('id');
});

client.on("messageCreate", message => {
    if (message.content == 'begin' && message.channel.id === fin.channelID) {
        message.reply('ok!');
        console.log('init in: ' + message.channel.id + ' in server: ' + message.guild.id)
        client.channels.cache.get(fin.channelID).send('.bt');
    }
});

client.on("messageCreate", message => {
    if (message.author.id === fin.aniGameID && message.channel.id === fin.channelID && !currentInteraction) {
        console.log(message.components)
        currentInteraction = true;
        message.clickButton();
    }
});

function init(jason) {
    fin = jason;
    client.login(jason.token);
}
