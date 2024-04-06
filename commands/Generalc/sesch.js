import fs from 'fs';
import { MessageEmbed } from "discord.js"
export const data = {
    name: "sesch",
    description:"Km istatistiklerini verir.",
    cooldown: 5, 
    async execute(interaction) {  
      return

      const { client } = interaction

      let totalvoicestat = '';
      const targetChannelId = '1142174876824784926';

      try {
        const data = fs.readFileSync('./database/totalvoicestatdata.json', 'utf8');
        const jsonData = JSON.parse(data);
        
        const channelvoicetimes = [];
    
        for (const userId in jsonData) {
          if (jsonData.hasOwnProperty(userId)) {
            const channelCount = jsonData[userId].channelvoicetime[targetChannelId] || 0;
            if (channelCount > 0) {
              channelvoicetimes.push({ userId, count: channelCount });
            }
          }
        }
    
        channelvoicetimes.sort((a, b) => b.count - a.count);
    
        const topResults = channelvoicetimes.slice(0, 10);
    
        for (const [index, entry] of topResults.entries()) {
          const isimcontrol = await client.users.fetch(entry.userId);
          const sadeceisim = await isimcontrol.username ? isimcontrol.username : entry.userId;
          totalvoicestat += `[${index + 1}]: ${sadeceisim}: ${entry.count}\n`;
        }
      } catch (error) {
        console.error('Hata:', error);
      }


          const response1 = new MessageEmbed()
          .setColor("WHITE")
          .setAuthor({name:"Müzisyenler Ses Kanalları İstatistikleri:", iconURL:interaction.guild.iconURL()})
          .setDescription(`<#${targetChannelId}> kategorisinin __**Tüm**__ istatistikleri.\n\`\`\`md\n${totalvoicestat === `` ? "Kimse yok" : totalvoicestat}\`\`\``)
          .setTimestamp() 

      interaction.reply({ embeds: [response1], ephemeral: true })











      //toplam haftalık günlük olacak. Sadece Kategoriler gözükecek
    }
}