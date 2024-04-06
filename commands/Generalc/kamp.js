import fs from 'fs';
import { MessageEmbed, MessageActionRow, MessageSelectMenu } from "discord.js"
export const data = {
    name: "kamp",
    description:"kamp istatistiklerini verir.",
    cooldown: 5, 
    async execute(interaction) {
      if (interaction.channel.id !== "1142175786556719205" && interaction.channel.id !== "1142175813991669761" && interaction.channel.id !== "1144376961209209024") return
      const { client } = interaction
      
        let weekvoicestat = ``
        let weekmsgstat = ``

          try {
            const data = fs.readFileSync('./databasea/kampvoicestatdata.json', 'utf8');
            const jsonData = JSON.parse(data);

            const sortedKeys = Object.keys(jsonData)
              .sort((a, b) => jsonData[b].totalvoicetime - jsonData[a].totalvoicetime)
              .slice(0, 30); 

            for (const [index, key] of sortedKeys.entries()) {
              const count = jsonData[key].totalvoicetime;
              const isimcontrol = await client.users.fetch(key)
              const sadeceisim = await isimcontrol.username ? isimcontrol.username : key
              weekvoicestat += `[${index + 1}]: ${sadeceisim}: ${count} dakika\n`;
            }
          } catch (error) {
            console.error('Hata:', error);
          }

          const response2 = new MessageEmbed()
          .setColor("WHITE")      
          .setAuthor({name:"Müzisyenler Kamp İstatistikler:", iconURL:interaction.guild.iconURL()})
          .addFields( 
            { name: "__**Zaman İstatistikleri**__", value: `\`\`\`md\n${weekvoicestat === `` ? "Kimse yok" : weekvoicestat}\`\`\``}
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

      interaction.reply({ content: interaction.member.id, embeds: [response2] })











      //toplam haftalık günlük olacak. Sadece Kategoriler gözükecek
    }
}