import { MessageEmbed } from "discord.js"
const userTimers = new Map();
const userTimersmor = new Map();
const userTimerskamp = new Map();
import fs from 'fs';
import databasebackup from '../utils/databasebackup.js';
export default client => {

    client.once('ready',async () => {
        console.log(`Logged in as ${client.user.username}!`);
      
            const newContent = "{}";

//return
        const guild = client.guilds.cache.get(process.env.guildid);      
      
      //mor
        setInterval(() => {

          if (!guild) return
          guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').forEach(voiceChannel => {
              const membersInVoiceChannel = voiceChannel.members.filter(member => member.roles.cache.has("341604749877051392")).map(member => member.user);
              if (membersInVoiceChannel.length > 0) {
                  membersInVoiceChannel.forEach(user => {
                      ///console.log(`Kişi ekleme --> Kanal: ${voiceChannel.parentId} kullanıcı: ${user.id}`);
                      userTimersmor.set(user.id, voiceChannel.parentId);
                  });
              }
          });
          userTimersmor.forEach((joinchannelid, userId) => {
                
            const member = client.guilds.cache.get(process.env.guildid).members.cache.get(userId);
            if (member && member.voice.channel) {
                ///console.log(`1dk eklendi ---> Kullanıcı: ${member.user.id} Kanal: ${joinchannelid}`)

            } else {
                userTimersmor.delete(userId);
                ///console.log(`Kişi Silme --> Kullanıcı: ${userId}`);
            }
        });            

            const jsonFilePaths = ['./databasemor/totalvoicestatdata.json', './databasemor/weekvoicestatdata.json', './databasemor/dayvoicestatdata.json'];
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
            
                userTimersmor.forEach((channelId, userId) => {
                  if (jsonData[userId]) {
                    jsonData[userId].totalvoicetime += 1;
                    jsonData[userId].channelvoicetime[channelId] = (jsonData[userId].channelvoicetime[channelId] || 0) + 1;
                  } else {
                    jsonData[userId] = {
                      totalvoicetime: 1,
                      channelvoicetime: {
                        [channelId]: 1
                      }
                    };
                  }
                });
            
                fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                  if (err) {
                    console.error(`Dosya "${jsonFilePath}" yazılırken bir hata oluştu:`, err);
                    return;
                  }
                  //console.log(`"${jsonFilePath}" dosyasındaki veriler başarıyla güncellendi.`);
                });
              });
            });
            setTimeout(function() {databasebackup("voicestatmor")}, 3000);
      }, 60000);

      //normal
        setInterval(() => {
            ///console.log(userTimers)


            if (!guild) return
            guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').forEach(voiceChannel => {
                const membersInVoiceChannel = voiceChannel.members.map(member => member.user);
                if (membersInVoiceChannel.length > 0) {
                    membersInVoiceChannel.forEach(user => {
                        ///console.log(`Kişi ekleme --> Kanal: ${voiceChannel.parentId} kullanıcı: ${user.id}`);
                        userTimers.set(user.id, voiceChannel.parentId);
                    });
                }
            });

            userTimers.forEach((joinchannelid, userId) => {
                
                const member = client.guilds.cache.get(process.env.guildid).members.cache.get(userId);
                if (member && member.voice.channel) {
                    ///console.log(`1dk eklendi ---> Kullanıcı: ${member.user.id} Kanal: ${joinchannelid}`)

                } else {
                    userTimers.delete(userId);
                    ///console.log(`Kişi Silme --> Kullanıcı: ${userId}`);
                }
            });            

                const jsonFilePaths = ['./database/totalvoicestatdata.json', './database/weekvoicestatdata.json', './database/dayvoicestatdata.json'];
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
                      const backupFilePath = jsonFilePaths.replace('./database/', './database/').replace('.json', 'backup.json');
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
                
                    userTimers.forEach((channelId, userId) => {
                      if (jsonData[userId]) {
                        jsonData[userId].totalvoicetime += 1;
                        jsonData[userId].channelvoicetime[channelId] = (jsonData[userId].channelvoicetime[channelId] || 0) + 1;
                      } else {
                        jsonData[userId] = {
                          totalvoicetime: 1,
                          channelvoicetime: {
                            [channelId]: 1
                          }
                        };
                      }
                    });
                
                    fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                      if (err) {
                        console.error(`Dosya "${jsonFilePath}" yazılırken bir hata oluştu:`, err);
                        return;
                      }
                      //console.log(`"${jsonFilePath}" dosyasındaki veriler başarıyla güncellendi.`);
                    });
                  });
                });
                setTimeout(function() {databasebackup("voicestat")}, 3000);


        }, 60000);
      
      //kamp
      
      /*
        setInterval(() => {
            ///console.log(userTimerskamp)


            if (!guild) return
            guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').forEach(voiceChannel => {
            //    const membersInVoiceChannel = voiceChannel.members.map(member => member.user);
              const membersInVoiceChannel = voiceChannel.members.filter(member => member.voice.channel.id === "1142175678041694360").map(member => member.user);

                if (membersInVoiceChannel.length > 0) {
                    membersInVoiceChannel.forEach(user => {
                        ///console.log(`Kişi ekleme --> Kanal: ${voiceChannel.parentId} kullanıcı: ${user.id}`);
                        userTimerskamp.set(user.id, voiceChannel.parentId);
                    });
                }
            });

            userTimerskamp.forEach((joinchannelid, userId) => {
                
                const member = client.guilds.cache.get(process.env.guildid).members.cache.get(userId);
                if (member && member.voice.channel) {
                    ///console.log(`1dk eklendi ---> Kullanıcı: ${member.user.id} Kanal: ${joinchannelid}`)

                } else {
                    userTimerskamp.delete(userId);
                    ///console.log(`Kişi Silme --> Kullanıcı: ${userId}`);
                }
            });            

                const jsonFilePaths = ['./databasea/kampvoicestatdata.json'];
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
                      const backupFilePath = jsonFilePaths.replace('./databasea/', './databasea/').replace('.json', 'backup.json');
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
                
                    userTimerskamp.forEach((channelId, userId) => {
                      if (jsonData[userId]) {
                        jsonData[userId].totalvoicetime += 1;
                        jsonData[userId].channelvoicetime[channelId] = (jsonData[userId].channelvoicetime[channelId] || 0) + 1;
                      } else {
                        jsonData[userId] = {
                          totalvoicetime: 1,
                          channelvoicetime: {
                            [channelId]: 1
                          }
                        };
                      }
                    });
                
                    fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                      if (err) {
                        console.error(`Dosya "${jsonFilePath}" yazılırken bir hata oluştu:`, err);
                        return;
                      }
                      //console.log(`"${jsonFilePath}" dosyasındaki veriler başarıyla güncellendi.`);
                    });
                  });
                });
                //setTimeout(function() {databasebackup("voicestat")}, 3000);


        }, 60000);
      
      */

        // günlük sıfırlayıcı
        function updateFileContentd(newContent) {
          fs.writeFileSync("./database/dayvoicestatdata.json", newContent, 'utf-8');
          fs.writeFileSync("./database/daymessagestatdata.json", newContent, 'utf-8');
          fs.writeFileSync("./databasemor/dayvoicestatdata.json", newContent, 'utf-8');
          fs.writeFileSync("./databasemor/daymessagestatdata.json", newContent, 'utf-8');
          fs.writeFileSync("./databasemorcmnd/daymessagestatdata.json", newContent, 'utf-8');
          console.log('Günlük sıfırlama başarılı.');
        }
        // haftalık sıfırlayıcı
        function updateFileContentw(newContent) {
          fs.writeFileSync("./database/weekvoicestatdata.json", newContent, 'utf-8');
          fs.writeFileSync("./database/weekmessagestatdata.json", newContent, 'utf-8');
          //fs.writeFileSync("./databasemor/weekvoicestatdata.json", newContent, 'utf-8');
          //fs.writeFileSync("./databasemor/weekmessagestatdata.json", newContent, 'utf-8');
          //fs.writeFileSync("./databasemorcmnd/weekmessagestatdata.json", newContent, 'utf-8');
          console.log('Haftalık sıfırlama başarılı.');
        }
     
        // günlük rol alma // 56
        async function RoleRemoved(newContentaa) {
          try {
            const jsonVerisi = fs.readFileSync('./databaserole/daymessagestatdata.json', 'utf8');          
            const veri = JSON.parse(jsonVerisi);          
            const gunlukBirinciId = veri.gunlukbirincis;
            
            const targetRoleId = '1147546890351693957';
            const guildId = '289158173900800010';

            const guild = client.guilds.cache.get(guildId);
            if (!guild) {
                console.error('Belirtilen sunucu bulunamadı.');
                return;
            }
            for (const userId of gunlukBirinciId) {
              try {
                  const member = await guild.members.fetch(userId);
                  if (member) {
                          await member.roles.remove(targetRoleId);
                          console.log(`Günlük rol başarıyla alındı: ${userId}`);
                  } else {
                      console.error(`Kullanıcı bulunamadı: ${userId}`);
                  }
              } catch (error) {
                  console.error(`Rol alma sırasında bir hata oluştu: ${error}`);
              }
          }



          } catch (hata) {
            console.error('Hata:', hata);
          }
        } 
        // günlük rol verilecekler // 57
        async function RoleUpdated(newContentaa) {

          try { 
            let messge = ``
            const gunlukbirincis = [];
            const data = fs.readFileSync('./database/daymessagestatdata.json', 'utf8');
            const jsonData = JSON.parse(data);

            const sortedKeys = Object.keys(jsonData)
              .sort((a, b) => jsonData[b].totalmessagecount - jsonData[a].totalmessagecount)
              .slice(0, 3);
            for (const [index, key] of sortedKeys.entries()) {
              const count = jsonData[key].totalmessagecount;              
              messge += `<@${key}> kişisi günlük ${count} mesaj attı.\n`
              if (!gunlukbirincis.includes(key)) {
                gunlukbirincis.push(key);
              }
            }
          
            const data2 = fs.readFileSync('./database/dayvoicestatdata.json', 'utf8');
            const jsonData2 = JSON.parse(data2);

            const sortedKeys2 = Object.keys(jsonData2)
              .sort((a, b) => jsonData2[b].totalvoicetime - jsonData2[a].totalvoicetime)
              .slice(0, 3);
            for (const [index, key] of sortedKeys2.entries()) {
              const count = jsonData2[key].totalvoicetime;              
              messge += `<@${key}> kişisi günlük ${count} dakika seste kaldı.\n`
              if (!gunlukbirincis.includes(key)) {
                gunlukbirincis.push(key);
              }
            }
           // console.log(gunlukbirincis)
            const datass = {
              "gunlukbirincis": gunlukbirincis
            };
            const datasss = JSON.stringify(datass, null, 2);
            fs.writeFileSync("./databaserole/daymessagestatdata.json", datasss, 'utf-8');
                    const response = new MessageEmbed()        
                    .setAuthor({ name: "Günlük Stat Rol Verilenler"})
                    .setDescription(`${messge}`)
                    .setColor('ORANGE');
                    const LogForChannel = await client.channels.fetch("1149868781838008370");
                    await LogForChannel.send({embeds: [response]})
      
          } catch (error) {
            console.error('Hata:', error);
          }
        }
        // günlük rol verme // 58
        async function RoleAddd(newContentaa) {
          try {
            const jsonVerisi = fs.readFileSync('./databaserole/daymessagestatdata.json', 'utf8');          
            const veri = JSON.parse(jsonVerisi);          
            const gunlukBirinciId = veri.gunlukbirincis;
            
            const targetRoleId = '1147546890351693957';
            const guildId = '289158173900800010';

            const guild = client.guilds.cache.get(guildId);
            if (!guild) {
                console.error('Belirtilen sunucu bulunamadı.');
                return;
            }
            for (const userId of gunlukBirinciId) {
             // console.log(userId,targetRoleId)
              try {              

                  const member = await guild.members.fetch(userId);
                  if (member) {
                      // Kullanıcının rollerini kontrol et
                      if (!(member.roles.cache.has('341604749877051392a') || member.roles.cache.has('887435831529324554a') || member.roles.cache.has('1147549387032109127a') || member.roles.cache.has('723051817466069044a'))) {
                          await member.roles.add(targetRoleId);
                        console.log("targetRoleId:",targetRoleId)
                          console.log(`Günlük rol başarıyla verildi: ${userId}`);
                      } else {
                          console.log(`Kullanıcı zaten belirtilen rolde: ${userId}`);
                      }
                  } else {
                      console.error(`Kullanıcı bulunamadı: ${userId}`);
                  }
              } catch (error) {
                  console.error(`Rol verme sırasında bir hata oluştu1: ${error}`);
              }
          }



          } catch (hata) {
            console.error('Hata:', hata);
          }
        }        
        // haftalık rol alma // 55 pazar
        async function RoleRemovew(newContentaa) {
          try {
            const jsonVerisi = fs.readFileSync('./databaserole/weekmessagestatdata.json', 'utf8');          
            const veri = JSON.parse(jsonVerisi);          
            const gunlukBirinciId = veri.gunlukbirincis;
            
            const targetRoleId = '1147549387032109127';
            const guildId = '289158173900800010';

            const guild = client.guilds.cache.get(guildId);
            if (!guild) {
                console.error('Belirtilen sunucu bulunamadı.');
                return;
            }
            for (const userId of gunlukBirinciId) {
              try {
                  const member = await guild.members.fetch(userId);
                  if (member) {
                          await member.roles.remove(targetRoleId);
                          console.log(`Haftalık rol başarıyla alındı: ${userId}`);
                  } else {
                      console.error(`Kullanıcı bulunamadı: ${userId}`);
                  }
              } catch (error) {
                  console.error(`Rol alma sırasında bir hata oluştu: ${error}`);
              }
          }



          } catch (hata) {
            console.error('Hata:', hata);
          }
        } 
        // haftalık rol verilecekler // 56 pazar
        async function RoleUpdatew(newContentaa) {

          try {    
            let messge = ``
            const gunlukbirincis = [];
            const data = fs.readFileSync('./database/weekmessagestatdata.json', 'utf8');
            const jsonData = JSON.parse(data);

            const sortedKeys = Object.keys(jsonData)
              .sort((a, b) => jsonData[b].totalmessagecount - jsonData[a].totalmessagecount)
              .slice(0, 3);
            for (const [index, key] of sortedKeys.entries()) {
              const count = jsonData[key].totalmessagecount;              
              messge += `<@${key}> kişisi haftalık ${count} mesaj attı.\n`
              if (!gunlukbirincis.includes(key)) {
                gunlukbirincis.push(key);
              }
            }
          
            const data2 = fs.readFileSync('./database/weekvoicestatdata.json', 'utf8');
            const jsonData2 = JSON.parse(data2);

            const sortedKeys2 = Object.keys(jsonData2)
              .sort((a, b) => jsonData2[b].totalvoicetime - jsonData2[a].totalvoicetime)
              .slice(0, 3);
            for (const [index, key] of sortedKeys2.entries()) {
              const count = jsonData2[key].totalvoicetime;              
              messge += `<@${key}> kişisi haftalık ${count} dakika seste kaldı.\n`
              if (!gunlukbirincis.includes(key)) {
                gunlukbirincis.push(key);
              }
            }
            //console.log(gunlukbirincis)
            const datass = {
              "gunlukbirincis": gunlukbirincis
            };
            const datasss = JSON.stringify(datass, null, 2);
            fs.writeFileSync("./databaserole/weekmessagestatdata.json", datasss, 'utf-8');
                    const response = new MessageEmbed()        
                    .setAuthor({ name: "Haftalık Stat Rol Verilenler"})
                    .setDescription(`${messge}`)
                    .setColor('ORANGE');
                    const LogForChannel = await client.channels.fetch("1149868781838008370");
                    await LogForChannel.send({embeds: [response]})

          } catch (error) {
            console.error('Hata:', error);
          }
        }
        // haftalık rol verme // 57 pazar
        async function RoleAddw(newContentaa) {
          try {
            const jsonVerisi = fs.readFileSync('./databaserole/weekmessagestatdata.json', 'utf8');          
            const veri = JSON.parse(jsonVerisi);          
            const gunlukBirinciId = veri.gunlukbirincis;
            
            const targetRoleId = '1147549387032109127';
            const guildId = '289158173900800010';

            const guild = client.guilds.cache.get(guildId);
            if (!guild) {
                console.error('Belirtilen sunucu bulunamadı.');
                return;
            }
            for (const userId of gunlukBirinciId) {
              try {
                  const member = await guild.members.fetch(userId);
                  if (member) {
                      if (!(member.roles.cache.has('341604749877051392a') || member.roles.cache.has('887435831529324554a') || member.roles.cache.has('723051817466069044a'))) {
                          await member.roles.add(targetRoleId);
                          console.log(`Haftalık rol başarıyla verildi: ${userId}`);
                      } else {
                          console.log(`Kullanıcı zaten belirtilen rolde: ${userId}`);
                      }
                  } else {
                      console.error(`Kullanıcı bulunamadı: ${userId}`);
                  }
              } catch (error) {
                  console.error(`Rol verme sırasında bir hata oluştu2: ${error}`);
              }
          }



          } catch (hata) {
            console.error('Hata:', hata);
          }
        }
      
      
        //sıfırlama timer'ı
        setInterval(function() {
          const currentTime = new Date();
          const currentHour = currentTime.getHours()+3;
          const currentMinute = currentTime.getMinutes();
          const currentDay = currentTime.getDay();
          if (currentHour === 23 && currentMinute === 59) {
            const newContent = "{}";
            updateFileContentd(newContent);
          }
          if (currentDay === 0 && currentHour === 23 && currentMinute === 59) {
            const newContent = "{}";
            updateFileContentw(newContent);
          }
          if (currentHour === 23 && currentMinute === 56) {
            const newContent = "{}";
            RoleRemoved("newContentaa");
          }          
          if (currentHour === 23 && currentMinute === 57) {
            const newContent = "{}";
            RoleUpdated("newContentaa");
          }
          if (currentHour === 23 && currentMinute === 58) {
            const newContent = "{}";
            RoleAddd("newContentaa");
          }
          if (currentDay === 0 && currentHour === 23 && currentMinute === 56) {
            const newContent = "{}";
            RoleRemovew("newContentaa");
          }          
          if (currentDay === 0 && currentHour === 23 && currentMinute === 57) {
            const newContent = "{}";
            RoleUpdatew("newContentaa");
          }
          if (currentDay === 0 && currentHour === 23 && currentMinute === 58) {
            const newContent = "{}";
            RoleAddw("newContentaa");
          }
        }, 20000);



       setInterval(async () => {     
           const channelId = '319479705550061568';
           const messageId = '1154526397952434226';
         
                 let weekvoicestat = ``
        let weekmsgstat = ``

          try {
            const data = fs.readFileSync('./database/dayvoicestatdata.json', 'utf8');
            if (!data) return
            const jsonData = JSON.parse(data);

            const sortedKeys = Object.keys(jsonData)
              .sort((a, b) => jsonData[b].totalvoicetime - jsonData[a].totalvoicetime)
              .slice(0, 5); 

            for (const [index, key] of sortedKeys.entries()) {
              const count = jsonData[key].totalvoicetime;
              const isimcontrol = await client.users.fetch(key)
              const sadeceisim = await isimcontrol.username ? isimcontrol.username : key
              weekvoicestat += `[${index + 1}]: ${sadeceisim}: ${count} dakika\n`;
            }
          } catch (error) {
            console.error('Hata:', error);
          }

          try {
            const data = fs.readFileSync('./database/daymessagestatdata.json', 'utf8');
            const jsonData = JSON.parse(data);

            const sortedKeys = Object.keys(jsonData)
              .sort((a, b) => jsonData[b].totalmessagecount - jsonData[a].totalmessagecount)
              .slice(0, 5); 

            for (const [index, key] of sortedKeys.entries()) {
              const count = jsonData[key].totalmessagecount;
              const isimcontrol = await client.users.fetch(key)
              const sadeceisim = isimcontrol.username ? isimcontrol.username : key
              weekmsgstat += `[${index + 1}]: ${sadeceisim}: ${count} mesaj\n`;
            }
          } catch (error) {
            console.error('Hata:', error);
          }

          const response = new MessageEmbed()
          .setColor("WHITE")      
          .setAuthor({name:"Müzisyenler Günlük İstatistikler:", iconURL:""})
          .addFields( 
            { name: "__**Ses Kanalı İstatistikleri**__", value: `\`\`\`md\n${weekvoicestat === `` ? "Kimse yok" : weekvoicestat}\`\`\``}, 
            { name: "__**Mesaj İstatistikleri**__", value: `\`\`\`md\n${weekmsgstat === `` ? "Kimse yok" : weekmsgstat}\`\`\``},
          )
          .setTimestamp() 

           const channel = client.channels.cache.get(channelId);
           if (channel?.isText()) {
               channel.messages.fetch(messageId)
                   .then(message => {
                       if (message) {                        
                               message.edit({ embeds: [response], ephemeral: true })
                               .catch(error => console.error('Mesaj düzenlenirken hata oluştu:', error));
                       }
                   })
                   .catch(error => console.error('Mesaj getirilirken hata oluştu:', error));
           }
       }, 60000);

       setInterval(async () => {     
           const channelId = '319479705550061568';
           const messageId = '1147983714375192667';
         
                 let weekvoicestat = ``
        let weekmsgstat = ``

          try {
            const data = fs.readFileSync('./database/weekvoicestatdata.json', 'utf8');
            if (!data) return
            const jsonData = JSON.parse(data);

            const sortedKeys = Object.keys(jsonData)
              .sort((a, b) => jsonData[b].totalvoicetime - jsonData[a].totalvoicetime)
              .slice(0, 5); 

            for (const [index, key] of sortedKeys.entries()) {
              const count = jsonData[key].totalvoicetime;
              const isimcontrol = await client.users.fetch(key)
              const sadeceisim = await isimcontrol.username ? isimcontrol.username : key
              weekvoicestat += `[${index + 1}]: ${sadeceisim}: ${count} dakika\n`;
            }
          } catch (error) {
            console.error('Hata:', error);
          }

          try {
            const data = fs.readFileSync('./database/weekmessagestatdata.json', 'utf8');
            const jsonData = JSON.parse(data);

            const sortedKeys = Object.keys(jsonData)
              .sort((a, b) => jsonData[b].totalmessagecount - jsonData[a].totalmessagecount)
              .slice(0, 5); 

            for (const [index, key] of sortedKeys.entries()) {
              const count = jsonData[key].totalmessagecount;
              const isimcontrol = await client.users.fetch(key)
              const sadeceisim = isimcontrol.username ? isimcontrol.username : key
              weekmsgstat += `[${index + 1}]: ${sadeceisim}: ${count} mesaj\n`;
            }
          } catch (error) {
            console.error('Hata:', error);
          }

          const response = new MessageEmbed()
          .setColor("WHITE")      
          .setAuthor({name:"Müzisyenler Haftalık İstatistikler:", iconURL:""})
          .addFields( 
            { name: "__**Ses Kanalı İstatistikleri**__", value: `\`\`\`md\n${weekvoicestat === `` ? "Kimse yok" : weekvoicestat}\`\`\``}, 
            { name: "__**Mesaj İstatistikleri**__", value: `\`\`\`md\n${weekmsgstat === `` ? "Kimse yok" : weekmsgstat}\`\`\``},
          )
          .setTimestamp() 

           const channel = client.channels.cache.get(channelId);
           if (channel?.isText()) {
               channel.messages.fetch(messageId)
                   .then(message => {
                       if (message) {                        
                               message.edit({ embeds: [response], ephemeral: true })
                               .catch(error => console.error('Mesaj düzenlenirken hata oluştu:', error));
                       }
                   })
                   .catch(error => console.error('Mesaj getirilirken hata oluştu:', error));
           }
       }, 60000);
      
      
      
       setInterval(async () => {     
           const channelId = '289158173900800010';
           const messageId = '1148019837268918343';
         
                 let weekvoicestat = ``
        let weekmsgstat = ``

          try {
            const data = fs.readFileSync('./database/totalvoicestatdata.json', 'utf8');
            if (!data) return

            const jsonData = JSON.parse(data);

            const sortedKeys = Object.keys(jsonData)
              .sort((a, b) => jsonData[b].totalvoicetime - jsonData[a].totalvoicetime)
              .slice(0, 5); 

            for (const [index, key] of sortedKeys.entries()) {
              const count = jsonData[key].totalvoicetime;
              const isimcontrol = await client.users.fetch(key)
              const sadeceisim = await isimcontrol.username ? isimcontrol.username : key
              weekvoicestat += `[${index + 1}]: ${sadeceisim}: ${count} dakika\n`;
            }
          } catch (error) {
            console.error('Hata:', error);
          }

          try {
            const data = fs.readFileSync('./database/totalmessagestatdata.json', 'utf8');
            const jsonData = JSON.parse(data);

            const sortedKeys = Object.keys(jsonData)
              .sort((a, b) => jsonData[b].totalmessagecount - jsonData[a].totalmessagecount)
              .slice(0, 5); 

            for (const [index, key] of sortedKeys.entries()) {
              const count = jsonData[key].totalmessagecount;
              const isimcontrol = await client.users.fetch(key)
              const sadeceisim = isimcontrol.username ? isimcontrol.username : key
              weekmsgstat += `[${index + 1}]: ${sadeceisim}: ${count} mesaj\n`;
            }
          } catch (error) {
            console.error('Hata:', error);
          }

          const response = new MessageEmbed()
          .setColor("WHITE")      
          .setAuthor({name:"Müzisyenler Tüm Zamanlar İstatistikleri:", iconURL:""})
          .addFields( 
            { name: "__**Ses Kanalı İstatistikleri**__", value: `\`\`\`md\n${weekvoicestat === `` ? "Kimse yok" : weekvoicestat}\`\`\``}, 
            { name: "__**Mesaj İstatistikleri**__", value: `\`\`\`md\n${weekmsgstat === `` ? "Kimse yok" : weekmsgstat}\`\`\``},
          )
          .setTimestamp() 

           const channel = client.channels.cache.get(channelId);
           if (channel?.isText()) {
               channel.messages.fetch(messageId)
                   .then(message => {
                       if (message) {                        
                               message.edit({ embeds: [response], ephemeral: true })
                               .catch(error => console.error('Mesaj düzenlenirken hata oluştu:', error));
                       }
                   })
                   .catch(error => console.error('Mesaj getirilirken hata oluştu:', error));
           }
       }, 60000);
    });

}