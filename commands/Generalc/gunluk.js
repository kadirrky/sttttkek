import fs from 'fs';
import { MessageEmbed, MessageActionRow, MessageSelectMenu } from "discord.js"
export const data = {
    name: "gunluk",
    description:"Km istatistiklerini verir.",
    cooldown: 5, 
    async execute(interaction) {
      const { client } = interaction  
      if(interaction.member.id !== "455974157168017409") return
        let weekvoicestat = `` 
        let weekmsgstat = ``

          try {
            const data = fs.readFileSync('./database/dayvoicestatdata.json', 'utf8');
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

          const response2 = new MessageEmbed()
          .setColor("WHITE")      
          .setAuthor({name:"Müzisyenler Günlük İstatistikler:", iconURL:interaction.guild.iconURL()})
          .addFields( 
            { name: "__**Ses Kanalı İstatistikleri**__", value: `\`\`\`md\n${weekvoicestat === `` ? "Kimse yok" : weekvoicestat}\`\`\``}, 
            { name: "__**Mesaj İstatistikleri**__", value: `\`\`\`md\n${weekmsgstat === `` ? "Kimse yok" : weekmsgstat}\`\`\``},
          )
          .setTimestamp() 

      interaction.channel.send({ embeds: [response2] })











      //toplam haftalık günlük olacak. Sadece Kategoriler gözükecek
    }
}