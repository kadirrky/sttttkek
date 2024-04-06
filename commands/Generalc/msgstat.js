import fs from 'fs';
import { MessageEmbed } from "discord.js"
export const data = {
    name: "msgstat",
    description:"Km istatistiklerini verir.",
    cooldown: 5, 
    async execute(interaction) {     

      const { client } = interaction
      
        let totalmsgstat = ``
        let weekmsgstat = ``
        let daymsgstat = ``       

          try {
            const data = fs.readFileSync('./database/totalmessagestatdata.json', 'utf8');
            const jsonData = JSON.parse(data);

            const sortedKeys = Object.keys(jsonData)
              .sort((a, b) => jsonData[b].totalmessagecount - jsonData[a].totalmessagecount)
              .slice(0, 10); 
              
            for (const [index, key] of sortedKeys.entries()) {
              const count = jsonData[key].totalmessagecount;
              const isimcontrol = await client.users.fetch(key)
              const sadeceisim = isimcontrol.username ? isimcontrol.username : key
              totalmsgstat += `[${index + 1}]: ${sadeceisim}: ${count} mesaj\n`;
            }
          } catch (error) {
            console.error('Hata:', error);
          }
          
          try {
            const data = fs.readFileSync('./database/weekmessagestatdata.json', 'utf8');
            const jsonData = JSON.parse(data);

            const sortedKeys = Object.keys(jsonData)
              .sort((a, b) => jsonData[b].totalmessagecount - jsonData[a].totalmessagecount)
              .slice(0, 10); 

            for (const [index, key] of sortedKeys.entries()) {
              const count = jsonData[key].totalmessagecount;
              const isimcontrol = await client.users.fetch(key)
              const sadeceisim = isimcontrol.username ? isimcontrol.username : key
              weekmsgstat += `[${index + 1}]: ${sadeceisim}: ${count} mesaj\n`;
            }
          } catch (error) {
            console.error('Hata:', error);
          }
          
          try {
            const data = fs.readFileSync('./database/daymessagestatdata.json', 'utf8');
            const jsonData = JSON.parse(data);

            const sortedKeys = Object.keys(jsonData)
              .sort((a, b) => jsonData[b].totalmessagecount - jsonData[a].totalmessagecount)
              .slice(0, 10);
              
            for (const [index, key] of sortedKeys.entries()) {
              const count = jsonData[key].totalmessagecount;
              const isimcontrol = await client.users.fetch(key)
              const sadeceisim = isimcontrol.username ? isimcontrol.username : key
              daymsgstat += `[${index + 1}]: ${sadeceisim}: ${count} mesaj\n`;
            }
          } catch (error) {
            console.error('Hata:', error);
          }
          
//           const response = new MessageEmbed()
//           .setColor("WHITE")
//           .setAuthor({name:"Müzisyenler Ses İstatistikleri:", iconURL:interaction.guild.iconURL()})
//           .setDescription(`
// __**Tüm İstatistikler:**__\`\`\`md\n${totalmsgstat === `` ? "Kimse yok" : totalmsgstat}\`\`\`\n
// __**Haftalık İstatistikler:**__\n\`\`\`md\n${weekmsgstat === `` ? "Kimse yok" : weekmsgstat}\`\`\`\n
// __**Günlük İstatistikler:**__\n\`\`\`md\n${daymsgstat === `` ? "Kimse yok" : daymsgstat}\`\`\``)
//           .setTimestamp() 


          const response1 = new MessageEmbed()
          .setColor("WHITE")
          .setAuthor({name:"Müzisyenler Tüm Ses İstatistikleri:", iconURL:interaction.guild.iconURL()})
          .setDescription(`\`\`\`md\n${totalmsgstat === `` ? "Kimse yok" : totalmsgstat}\`\`\``)
          .setTimestamp() 
          const response2 = new MessageEmbed()
          .setColor("WHITE")
          .setAuthor({name:"Müzisyenler Haftalık Ses İstatistikleri:", iconURL:interaction.guild.iconURL()})
          .setDescription(`\`\`\`md\n${weekmsgstat === `` ? "Kimse yok" : weekmsgstat}\`\`\``)
          .setTimestamp() 
          const response3 = new MessageEmbed()
          .setColor("WHITE")
          .setAuthor({name:"Müzisyenler Günlük Ses İstatistikleri:", iconURL:interaction.guild.iconURL()})
          .setDescription(`\`\`\`md\n${daymsgstat === `` ? "Kimse yok" : daymsgstat}\`\`\``)
          .setTimestamp() 

      interaction.reply({ embeds: [response1,response2,response3], ephemeral: true })











      //toplam haftalık günlük olacak. Sadece Kategoriler gözükecek
    }
}