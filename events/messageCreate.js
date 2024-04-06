import fs from 'fs';
import cooldown_control from "../utils/cooldown_control.js";
import embed from "../utils/bot/embed.js";
import databasebackup from '../utils/databasebackup.js';
import register_commands from "../utils/bot/register_commands.js";
const userMessages = new Map();
const userMessagesmor = new Map();
const userMessagesmorcmnd = new Map();

setInterval(() => {
  ///console.log(userMessagesmorcmnd)
  for (const [userId, userChannelMessages] of userMessagesmorcmnd.entries()) {
      for (const [channelId, messageCount] of userChannelMessages.entries()) {
          ///console.log(`${messageCount} Mesaj eklendi ---> Kullanıcı: ${userId} Kanal: ${channelId}`);
      }
  }
  const jsonFilePaths = ['./databasemorcmnd/totalmessagestatdata.json', './databasemorcmnd/weekmessagestatdata.json', './databasemorcmnd/daymessagestatdata.json'];
  jsonFilePaths.forEach(jsonFilePath => {

    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
      let errorStatus
      if (err) {
        console.error('Dosya okuma hatası:', err);
        errorStatus = "true"    
    }
    if(errorStatus === "true") return console.log(`Data okunurken hata çıktı.`)

    let jsonData
    try{
        jsonData = JSON.parse(data)
    } catch (error) {   
        console.error(error)
        const backupFilePath = filePath.replace('./databasemorcmnd/', './databasemorcmnd/').replace('.json', 'backup.json');

        fs.readFile(backupFilePath, 'utf8', (err, data) => {
            if (err) {
              console.error('Yedek dosya okunurken bir hata oluştu:', err);
              return;
            }
          
            fs.writeFile(jsonFilePath, data, 'utf8', (err) => {
              if (err) {
                console.error('Yedek dosya yazılırken bir hata oluştu:', err);
                return;
              }
              console.log('Yedek dosya başarıyla kopyalandı.');
            });
          });
        return
    }
    
      userMessagesmorcmnd.forEach((channelMap, userId) => {
        if (!jsonData[userId]) {
          jsonData[userId] = {
            totalmessagecount: 0,
            channelmessagecount: {}
          };
        }
        
        
        channelMap.forEach((count, channelId) => {
          jsonData[userId].totalmessagecount += count;
          if (!jsonData[userId].channelmessagecount[channelId]) {
            jsonData[userId].channelmessagecount[channelId] = 0;
          }
          jsonData[userId].channelmessagecount[channelId] += count;
        });
      });
    
      fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Dosya yazma hatası:', err);
        } else {
          //console.log('Veriler başarıyla güncellendi.');
          userMessagesmorcmnd.clear();
        }
      });
    });
  });

  setTimeout(function() {databasebackup("messagestatmorcmnd")}, 3000);

}, 60000);


setInterval(() => {
  ///console.log(userMessages)
  for (const [userId, userChannelMessages] of userMessagesmor.entries()) {
      for (const [channelId, messageCount] of userChannelMessages.entries()) {
          ///console.log(`${messageCount} Mesaj eklendi ---> Kullanıcı: ${userId} Kanal: ${channelId}`);
      }
  }
  const jsonFilePaths = ['./databasemor/totalmessagestatdata.json', './databasemor/weekmessagestatdata.json', './databasemor/daymessagestatdata.json'];
  jsonFilePaths.forEach(jsonFilePath => {

    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
      let errorStatus
      if (err) {
        console.error('Dosya okuma hatası:', err);
        errorStatus = "true"    
    }
    if(errorStatus === "true") return console.log(`Data okunurken hata çıktı.`)

    let jsonData
    try{
        jsonData = JSON.parse(data)
    } catch (error) {   
        console.error(error)
        const backupFilePath = jsonFilePath.replace('./databasemor/', './databasemor/').replace('.json', 'backup.json');

        fs.readFile(backupFilePath, 'utf8', (err, data) => {
            if (err) {
              console.error('Yedek dosya okunurken bir hata oluştu:', err);
              return;
            }
          
            fs.writeFile(jsonFilePath, data, 'utf8', (err) => {
              if (err) {
                console.error('Yedek dosya yazılırken bir hata oluştu:', err);
                return;
              }
              console.log('Yedek dosya başarıyla kopyalandı.');
            });
          });
        return
    }
    
      userMessagesmor.forEach((channelMap, userId) => {
        if (!jsonData[userId]) {
          jsonData[userId] = {
            totalmessagecount: 0,
            channelmessagecount: {}
          };
        }
        
        
        channelMap.forEach((count, channelId) => {
          jsonData[userId].totalmessagecount += count;
          if (!jsonData[userId].channelmessagecount[channelId]) {
            jsonData[userId].channelmessagecount[channelId] = 0;
          }
          jsonData[userId].channelmessagecount[channelId] += count;
        });
      });
    
      fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Dosya yazma hatası:', err);
        } else {
          //console.log('Veriler başarıyla güncellendi.');
          userMessagesmor.clear();
        }
      });
    });
  });

  setTimeout(function() {databasebackup("messagestatmor")}, 3000);

}, 60000);



setInterval(() => {
    ///console.log(userMessages)
    for (const [userId, userChannelMessages] of userMessages.entries()) {
        for (const [channelId, messageCount] of userChannelMessages.entries()) {
            ///console.log(`${messageCount} Mesaj eklendi ---> Kullanıcı: ${userId} Kanal: ${channelId}`);
        }
    }
    const jsonFilePaths = ['./database/totalmessagestatdata.json', './database/weekmessagestatdata.json', './database/daymessagestatdata.json'];
    jsonFilePaths.forEach(jsonFilePath => {

      fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        let errorStatus
        if (err) {
          console.error('Dosya okuma hatası:', err);
          errorStatus = "true"    
      }
      if(errorStatus === "true") return console.log(`Data okunurken hata çıktı.`)

      let jsonData
      try{
          jsonData = JSON.parse(data)
      } catch (error) {   
          console.error(error)
          const backupFilePath = jsonFilePath.replace('./database/', './database/').replace('.json', 'backup.json');

          fs.readFile(backupFilePath, 'utf8', (err, data) => {
              if (err) {
                console.error('Yedek dosya okunurken bir hata oluştu:', err);
                return;
              }
            
              fs.writeFile(jsonFilePath, data, 'utf8', (err) => {
                if (err) {
                  console.error('Yedek dosya yazılırken bir hata oluştu:', err);
                  return;
                }
                console.log('Yedek dosya başarıyla kopyalandı.');
              });
            });
          return
      }
      
        userMessages.forEach((channelMap, userId) => {
          if (!jsonData[userId]) {
            jsonData[userId] = {
              totalmessagecount: 0,
              channelmessagecount: {}
            };
          }
          
          
          channelMap.forEach((count, channelId) => {
            jsonData[userId].totalmessagecount += count;
            if (!jsonData[userId].channelmessagecount[channelId]) {
              jsonData[userId].channelmessagecount[channelId] = 0;
            }
            jsonData[userId].channelmessagecount[channelId] += count;
          });
        });
      
        fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
          if (err) {
            console.error('Dosya yazma hatası:', err);
          } else {
            //console.log('Veriler başarıyla güncellendi.');
            userMessages.clear();
          }
        });
      });
    });

    setTimeout(function() {databasebackup("messagestat")}, 3000);

}, 60000);


export default client => {
    const prefix = process.env.prefix
    client.on('messageCreate',  message => {
      
      
      if (message.type === "APPLICATION_COMMAND" && (message.channel.id === "319479705550061568" || message.channel.id === "1142177880101638144" || message.channel.id === "1142145530164674581" || message.channel.id === "1144376961209209024aa")){
        const logcmnd = message.interaction.commandName

        if (logcmnd === "rol" || logcmnd === "rolver" || logcmnd === "rolal" || logcmnd === "teyit" || logcmnd === "unteyit" || logcmnd === "mute" || logcmnd === "unmute" || logcmnd === "odayasak" || logcmnd === "kademedegis"){
          if (!userMessagesmorcmnd.has(message.interaction.user.id)) {
            userMessagesmorcmnd.set(message.interaction.user.id, new Map());
          }
        
          const userChannelMessagesmorcmnd = userMessagesmorcmnd.get(message.interaction.user.id);
          if (!userChannelMessagesmorcmnd.has(logcmnd)) {
            userChannelMessagesmorcmnd.set(logcmnd, 1);
          } else {
                const messageCount = userChannelMessagesmorcmnd.get(logcmnd);
                userChannelMessagesmorcmnd.set(logcmnd, messageCount + 1);
          }
        }

      }
      
      
        if (message.author.bot) return
        // if(message.content === "komutekle"){
        //     await register_commands(message.guild)
        // }s


        
        if (!userMessages.has(message.author.id)) {
            userMessages.set(message.author.id, new Map());
        }
    
        const userChannelMessages = userMessages.get(message.author.id);
        if (!userChannelMessages.has(message.channel.id)) {
            userChannelMessages.set(message.channel.id, 1);
        } else {
            const messageCount = userChannelMessages.get(message.channel.id);
            userChannelMessages.set(message.channel.id, messageCount + 1);
        }


        if (message.member.roles.cache.has("341604749877051392")){
          if (!userMessagesmor.has(message.author.id)) {
            userMessagesmor.set(message.author.id, new Map());
            }
        
            const userChannelMessagesmor = userMessagesmor.get(message.author.id);
            if (!userChannelMessagesmor.has(message.channel.id)) {
              userChannelMessagesmor.set(message.channel.id, 1);
            } else {
                const messageCount = userChannelMessagesmor.get(message.channel.id);
                userChannelMessagesmor.set(message.channel.id, messageCount + 1);
            }
        }


        // if (message.type !== "DEFAULT") return
        if (message.content.startsWith(prefix) == false) return

        const args = message.content.slice(1).trim().split(/ +/)
        const commandName = args.shift().toLowerCase()
        
        
                if (message.member.roles.cache.has("341604749877051392")){
          if (commandName === "rol" || commandName === "rolver" || commandName === "rolal" || commandName === "teyit" || commandName === "unteyit" || commandName === "mute" || commandName === "unmute" || commandName === "odayasak" || commandName === "kademedegis"){

            if (!userMessagesmorcmnd.has(message.author.id)) {
            userMessagesmorcmnd.set(message.author.id, new Map());
            }
        
            const userChannelMessagesmorcmnd = userMessagesmorcmnd.get(message.author.id);
            if (!userChannelMessagesmorcmnd.has(commandName)) {
              userChannelMessagesmorcmnd.set(commandName, 1);
            } else {
                const messageCount = userChannelMessagesmorcmnd.get(commandName);
                userChannelMessagesmorcmnd.set(commandName, messageCount + 1);
            }
            
          }
        }

        const command = client.commands.get(commandName)
        if(!command) return
  
        // Cooldown_control
        const cooldown = cooldown_control(command,message.member.id)
        if (cooldown) return message.reply({
            embeds: [
                embed(`Bu komutu tekrar kullanmak için \`${cooldown}\` saniye beklemelisiniz.`,"RED")
            ]
        }).then(async msg  => {
            setTimeout(() => {
                msg.delete()
              }, cooldown*1000 + 1000);
              
        })

        try{
            const interaction = message
            
            command.data.execute(interaction)
        } catch (e){
            console.log(e)
            message.reply(`Bu komutta \`${commandName}\` şu anda hata var!`)
        }
    });

}