const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const client = new Client();
fin = {};
NextIsFight = false;
FightResult = 0;

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
    if(message.author.id === fin.aniGameID && message.channel.id === fin.channelID) console.log(message.embeds);
    switch (NextIsFight) {
        case true:
            if(message.author.id === fin.aniGameID && message.channel.id === fin.channelID) NextIsFight = false;
            console.log('Fight in progress!')
            break;
        case false:
            switch (message.content.split(" ")[0]) {
                case 'begin':
                    if(message.channel.id === fin.channelID && message.author.id === client.user.id) {
                        message.reply('ok!');
                        console.log('init in: ' + message.channel.id + ' in server: ' + message.guild.id)
                        client.channels.cache.get(fin.channelID).send('.bt');
                    }
                    break;
            
                case 'Congratulations!':
                    if(message.channel.id === fin.channelID && message.author.id === fin.aniGameID) {
                        client.channels.cache.get(fin.channelID).send('.bt');
                        console.log('Fight Complete!')
                        break;
                    }
                default:
                    if(message.author.id === fin.aniGameID && message.channel.id === fin.channelID){
                        console.log(message.embeds[0].footer.text.split("  ")[0]);
                        try {
                            if(message.embeds[0].footer.text == 'React with ✅ to confirm the battle!') {
                                message.clickButton();
                                NextIsFight = true;
                            }
                        } catch (error) {
                            console.log('message has no embed')
                        }
                    }
            }

    }
});


function init(jason) {
    fin = jason;
    client.login(jason.token);
}
/*
  if (message.author.id === fin.aniGameID && message.channel.id === fin.channelID && !currentInteraction) {
            console.log(message.components)
            currentInteraction = true;
            message.clickButton();
            NextIsFight = true;
        }
*/