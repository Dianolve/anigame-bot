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
                console.log('init in: ' + message.channel.id + ' in server: ' + message.guild.id)
            }
            break;

        case 'Congratulations!':
            if(message.channel.id === fin.channelID && message.author.id === fin.aniGameID && !StamLow) {
                client.channels.cache.get(fin.channelID).send('.bt');
                console.log('Fight Complete!')
                break;
            }

        default:
            if(message.author.id === fin.aniGameID && message.channel.id === fin.channelID){
                try {
                    console.log(message.embeds[0].footer.text.split("  ")[0]);

                    if(message.embeds[0].footer.text == 'React with ✅ to confirm the battle!') {
                        message.clickButton();
                    } else if (message.embeds[0].title == 'Error ⛔') {
                        StamLow = true;
                        setTimeout(() => {
                            client.channels.cache.get(fin.channelID).send('.bt');
                            StamLow = false; 
                        }, (StamTotal / 3) * 4 * 60 * 1000);
                    } else if (message.embeds[0].title == '**Defeated :CRY:**') {
                        Character++;
                        Character = (Character % 4) + 1;
                        client.channels.cache.get(fin.channelID).send('.select ' + Character);
                    } else if (message.embeds[0].title == '**Scratch Ticket :scratchticket:**') {
                        message.clickButton();
                    }

                } catch (error) {
                    console.log('message has no embed')
                }
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
