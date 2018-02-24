var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

var federicoID = 238346601058271233;
var andonioID = 148080204496109568;
var lucaID = 259071779010641931;

bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    var isImage = message.search(".jpg");
    if (isImage != null && isImage >= 0)
    {
      bot.sendMessage({to: channelID, message: 'Bella l\'immagine!'});
    }

    if (message.substring(0, 7) == 'Andonio' && userID != bot.id)
    {
      bot.sendMessage({to: channelID, message: 'Non nominare il mio nome invano!'});
    }

    var narutoPos = message.search("naruto è brutto");
    if (narutoPos != null && narutoPos >= 0)
    {
      bot.sendMessage({to: channelID, message: "NON TI PERMETTERE!"});
      bot.kick({userID: andonioID});
    }



    //148080204496109568: Andonio
    //238346601058271233: TrueManSquad
    var arrivoPos = message.search("arrivo")
    if (arrivoPos != null && arrivoPos >= 0 && userID == 238346601058271233)
    {
      bot.sendMessage({to: channelID, message: "sure"});
    }

    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;

            case 'video':
              bot.sendMessage({to: channelID, messsage: '!!!play https://www.youtube.com/watch?v=CAL7Yk8304o'});
            break;

            case 'saluta':
                bot.sendMessage({to: channelID, message: 'Andonio!!'});
            break;

            case 'fattiVedere':
              bot.sendMessage({to: channelID, message: 'https://www.ilmattino.it/photos/PANORAMA/29/57/2532957_1043_16729329_1858999784312503_2081834512848966820_n.jpg'})
            break;

            case 'doveVaiOggi':
              bot.sendMessage({to: channelID, message: 'All\'ipercoop a comprare le figurine Panini'});
            break;

            case 'ipercoop':
              bot.sendMessage({to: channelID, message: 'Luca pls, non dubiti del capo supremo. E ricorda, Determination!'});
              bot.sendMessage({to: userID, message: 'Luca pls, non dubiti del capo supremo. E ricorda, Determination!'});
            break;

            case 'vocale':
                bot.sendMessage({to: channelID, message: '/tts Sono Andonio, cosa c\'è Marco?'});
            break;

            case 'spoiler':
              bot.sendMessage({to: channelID,  message: "SPOILER INCOMING"});
              bot.deafen({userID: federicoID});
            break;

            // Just add any case commands if you want to..
         }
     }
});
