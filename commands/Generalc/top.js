import fs from 'fs';
import { MessageEmbed, MessageActionRow, MessageSelectMenu } from "discord.js"
export const data = {
    name: "top",
    description:"Km istatistiklerini verir.",
    cooldown: 5, 
    async execute(interaction) {
      if (interaction.channel.id !== "1142174288728826018" && interaction.channel.id !== "1142177880101638144" && interaction.channel.id !== "1143202296587636757") return
      const { client } = interaction
      
        let weekvoicestat = ``
        let weekmsgstat = ``

          try {
            const data = fs.readFileSync('./database/weekvoicestatdata.json', 'utf8');
            const jsonData = JSON.parse(data);

            const sortedKeys = Object.keys(jsonData)
              .sort((a, b) => jsonData[b].totalvoicetime - jsonData[a].totalvoicetime)
              .slice(0, 3); 

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
              .slice(0, 3); 

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
          .setAuthor({name:"Müzisyenler Haftalık İstatistikler:", iconURL:interaction.guild.iconURL()})
          .addFields( 
            { name: "__**Ses Kanalı İstatistikleri**__", value: `\`\`\`md\n${weekvoicestat === `` ? "Kimse yok" : weekvoicestat}\`\`\``}, 
            { name: "__**Mesaj İstatistikleri**__", value: `\`\`\`md\n${weekmsgstat === `` ? "Kimse yok" : weekmsgstat}\`\`\``},
          )
          .setTimestamp() 

          const SelectMenuArray = [
            {emoji: "📈", label: "Anasayfa", value: "selecttanasayfa"},
            {emoji: "🔊", label: "(1 Gün) Ses Kanalı İstatistikleri", value: "selecttseskanalid"},
            {emoji: "🔊", label: "(7 Gün) Ses Kanalı İstatistikleri", value: "selecttseskanaliw"},
            {emoji: "🔊", label: "(Toplam) Ses Kanalı İstatistikleri", value: "selecttseskanalit"},
            {emoji: "✉️", label: "(1 Gün) Mesaj İstatistikleri", value: "selecttmesajd"},
            {emoji: "✉️", label: "(7 Gün) Mesaj İstatistikleri", value: "selecttmesajw"},
            {emoji: "✉️", label: "(Toplam) Mesaj İstatistikleri", value: "selecttmesajt"},
            {emoji: "❌", label: "Mesajı Sil", value: "selecttdelete"}
          ]
          
          const row = new MessageActionRow()
          .setComponents(
              new MessageSelectMenu()
                  .setCustomId("selectt")
                  .setPlaceholder("Detaylı İstatistikler")
                  .setOptions([SelectMenuArray])      
          )

      interaction.reply({ content: interaction.member.id, embeds: [response2], components: [row], })











      //toplam haftalık günlük olacak. Sadece Kategoriler gözükecek
    }
}