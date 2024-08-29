const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const client = new Client();
fin = {};
FightResult = 0;
StamTotal = 0;
StamLow = false;
Character = 1;

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

    switch (message.content.split(" ")[0]) {
        case '**' + client.user.username + '**,':
            if(message.channel.id === fin.channelID && message.author.id === fin.aniGameID) {
                StamTotal = parseInt(message.content.split(" ")[4].replace(/\_/g, ' ').split("/")[1]);
                client.channels.cache.get(fin.channelID).send('.bt');
                console.log('starting lole');
                break;
            }

        case 'begin':
            if(message.channel.id === fin.channelID && message.author.id === client.user.id) {
                message.reply('ok!');
                client.channels.cache.get(fin.channelID).send('.stam');
                client.channels.cache.get(fin.channelID).send('.select 1');
                console.log('init in: ' + message.channel.id + ' in server: ' + message.guild.id)
            }
            break;

        case 'Congratulations!':
            if(message.channel.id === fin.channelID && message.author.id === fin.aniGameID && !StamLow) {
                client.channels.cache.get(fin.channelID).send('.bt');
                break;
            }

        default:
            if(message.author.id === fin.aniGameID && message.channel.id === fin.channelID){
                try {
                    if (message.embeds[0].title == 'Error ⛔') {
                        console.log('lowstam')
                        StamLow = true;
                        setTimeout(() => {
                            client.channels.cache.get(fin.channelID).send('.bt');
                            StamLow = false; 
                        }, (StamTotal / 3) * 4 * 60 * 1000);
                    } else if (message.embeds[0].title.split(' ')[0] == '**Defeated') {
                        Character = (Character % 3) + 1;
                        client.channels.cache.get(fin.channelID).send('.select ' + Character);
                        client.channels.cache.get(fin.channelID).send('.bt');
                    } else if (message.embeds[0].title.split(' ')[0] == '**Scratch') {
                        message.clickButton();
                    }
                    else if(message.embeds[0].title == 'Congratulations!'){
                        client.channels.cache.get(fin.channelID).send('.loc ' + message.embeds[0].description.split('`')[1].split(' ')[1]);
                    }
                    else if(message.embeds[0].footer !== 'undefined') {
                        try {
                            if(message.embeds[0].footer.text == 'React with ✅ to confirm the battle!') {
                                try {
                                    message.clickButton();
                                } catch (error) {
                                    console.log('interaction failed');
                                }
                            }
                        } catch (error) {
                            console.error();                            
                        }
                    }

                } catch (error) {
                    console.log('message has no embed \n' + error)
                }
            }
    }
});

setInterval(() => {
    client.channels.cache.get(fin.channelID).send('.hourly');
}, 60 * 60 * 1000);

setInterval(() => {
    client.channels.cache.get(fin.channelID).send('.lotto');
}, 15 * 60 * 1000);

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
