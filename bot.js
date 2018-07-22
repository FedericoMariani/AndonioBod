var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
var fs = require('fs');

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
var channelStandardID = "260112129338769408";
var serverID = "238348406781771788";


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

    var narutoPos = message.search("Naruto");
    if (message.substring(0, 7) == 'Luca pls' && userID != bot.id)
    {
      bot.sendMessage({to: channelID, message: 'Cosi non si fa Luca'});
    }

    var narutoPos = message.search("naruto è brutto");
    if (narutoPos != null && narutoPos >= 0)
    {
      bot.kick({userID: andonioID});
      bot.sendMessage({to: channelID, message: "NON TI PERMETTERE!"});
    }

    var narutoPos = message.search("Naruto");
    if (narutoPos != null && narutoPos >= 0)
    {
      //Let's join the voice channel, the ID is whatever your voice channel's ID is.
      //Let's join the voice channel, the ID is whatever your voice channel's ID is.
      bot.joinVoiceChannel(channelStandardID, function(error, events) {
        //Check to see if any errors happen while joining.
        if (error) return logger.info(error);

        //Then get the audio context
        bot.getAudioContext(channelStandardID, function(error, stream) {
          //Once again, check to see if any errors exist
          if (error) return logger.info(error);

          //Create a stream to your file and pipe it to the stream
          //Without {end: false}, it would close up the stream, so make sure to include that.
          fs.createReadStream('NarutoSong.mp3').pipe(stream, {end: false});

          //The stream fires `done` when it's got nothing else to send to Discord.
          stream.on('done', function() {
             bot.leaveVoiceChannel(channelStandardID);
          });
        });
      });
    }

    var narutoPos = message.search("Saluta Andonio");
    if (narutoPos != null && narutoPos >= 0)
    {
      //Let's join the voice channel, the ID is whatever your voice channel's ID is.
      //Let's join the voice channel, the ID is whatever your voice channel's ID is.
      bot.joinVoiceChannel(channelStandardID, function(error, events) {
        //Check to see if any errors happen while joining.
        if (error) return logger.info(error);

        //Then get the audio context
        bot.getAudioContext(channelStandardID, function(error, stream) {
          //Once again, check to see if any errors exist
          if (error) return logger.info(error);

          //Create a stream to your file and pipe it to the stream
          //Without {end: false}, it would close up the stream, so make sure to include that.
          fs.createReadStream('SalutaAndonio.mp3').pipe(stream, {end: false});

          //The stream fires `done` when it's got nothing else to send to Discord.
          stream.on('done', function() {
             bot.leaveVoiceChannel(channelStandardID);
          });
        });
      });
    }

    //148080204496109568: Andonio
    //238346601058271233: TrueManSquad
    //259071779010641931: Luca
    var arrivoPos = message.search("ci sei?");
    if (arrivoPos != null && arrivoPos >= 0 && (userID == lucaID || userID == andonioID))
    {
      bot.sendMessage({to: channelID, message: "forse c\'\è forse non c\'\è chi lo sa"});
    }

    arrivoPos = message.search("arrivo tra");
    if (arrivoPos != null && arrivoPos >= 0 && userID == andonioID)
    {
      bot.sendMessage({to: channelID, message: "sure"});
    }

    arrivoPos = message.search("arrivo tra");
    if (arrivoPos != null && arrivoPos >= 0 && userID == lucaID)
    {
      bot.sendMessage({to: channelID, message: "sure"});
    }

    arrivoPos = message.search("arrivo tra poco");
    if (arrivoPos != null && arrivoPos >= 0 && userID == lucaID)
    {
      bot.sendMessage({to: channelID, message: "k"});
    }

    arrivoPos = message.search("dove vai oggi Andonio?");
    if (arrivoPos != null && arrivoPos >= 0)
    {
      bot.sendMessage({to: channelID, message: 'All\'ipercoop a comprare le figurine Panini'});
    }

    arrivoPos = message.search("fatti vedere");
    if (arrivoPos != null && arrivoPos >= 0)
    {
      bot.sendMessage({to: channelID, message: 'https://www.ilmattino.it/photos/PANORAMA/29/57/2532957_1043_16729329_1858999784312503_2081834512848966820_n.jpg'});
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
              bot.sendMessage({to: channelID, messsage: "!!!play https://www.youtube.com/watch?v=CAL7Yk8304o"});
            break;

            case 'saluta':
                bot.sendMessage({to: channelID, message: 'Andonio!!'});
            break;

            case 'fattiVedere':
              bot.sendMessage({to: channelID, message: 'https://www.ilmattino.it/photos/PANORAMA/29/57/2532957_1043_16729329_1858999784312503_2081834512848966820_n.jpg'});
            break;

            case 'doveVaiOggi':
              bot.sendMessage({to: channelID, message: 'All\'ipercoop a comprare le figurine Panini'});
            break;

            case 'ipercoop':
              bot.sendMessage({to: channelID, message: 'Luca pls, non dubiti del capo supremo. E ricorda, Determination!'});
            break;

            case 'vocale':
                bot.sendMessage({to: channelID, message: '/tts Sono Andonio, cosa c\'è Marco?'});
            break;

            case 'spoiler':
              bot.sendMessage({to: channelID,  message: "SPOILER INCOMING"});
              bot.deafen({userID: federicoID});
            break;

			case 'stampaServer':
		      var serverData = bot.servers[0].id;
          bot.sendMessage({to: channelID, message: "CCCCCC"});
			    bot.sendMessage({to: channelID, message: serverData});
			break;

            case 'salutaAudio':
              //Let's join the voice channel, the ID is whatever your voice channel's ID is.
              //Let's join the voice channel, the ID is whatever your voice channel's ID is.
              bot.joinVoiceChannel(channelStandardID, function(error, events) {
                //Check to see if any errors happen while joining.
                if (error) return logger.info(error);

                //Then get the audio context
                bot.getAudioContext(channelStandardID, function(error, stream) {
                  //Once again, check to see if any errors exist
                  if (error) return logger.info(error);

                  //Create a stream to your file and pipe it to the stream
                  //Without {end: false}, it would close up the stream, so make sure to include that.
                  fs.createReadStream('NarutoSong.mp3').pipe(stream, {end: false});

                  //The stream fires `done` when it's got nothing else to send to Discord.
                  stream.on('done', function() {
                     //Handle
                  });
                });
              });
            break;

            // Just add any case commands if you want to..
         }
     }
});
