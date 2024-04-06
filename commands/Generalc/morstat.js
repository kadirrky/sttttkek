import fs from 'fs';
import { MessageEmbed, MessageActionRow, MessageSelectMenu } from "discord.js"
export const data = {
    name: "morstat",
    description:"Km istatistiklerini verir.",
    cooldown: 5, 
    async execute(interaction) {     

      const { client } = interaction
      
        let weekvoicestat = ``
        let weekmsgstat = ``
        let weekcmndstat = ``

          try {
            const data = fs.readFileSync('./databasemor/weekvoicestatdata.json', 'utf8');
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
            const data = fs.readFileSync('./databasemor/weekmessagestatdata.json', 'utf8');
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

          try {
            const data = fs.readFileSync('./databasemorcmnd/weekmessagestatdata.json', 'utf8');
            const jsonData = JSON.parse(data);

            const sortedKeys = Object.keys(jsonData)
              .sort((a, b) => jsonData[b].totalmessagecount - jsonData[a].totalmessagecount)
              .slice(0, 5); 

            for (const [index, key] of sortedKeys.entries()) {
              const count = jsonData[key].totalmessagecount;
              const isimcontrol = await client.users.fetch(key)
              const sadeceisim = isimcontrol.username ? isimcontrol.username : key
              weekcmndstat += `[${index + 1}]: ${sadeceisim}: ${count} komut\n`;
            }
          } catch (error) {
            console.error('Hata:', error);
          }

          const response2 = new MessageEmbed()
          .setColor("WHITE")      
          .setAuthor({name:"Müzisyenler M.O.R. 2 Haftalık İstatistikler:", iconURL:interaction.guild.iconURL()})
          .addFields( 
            { name: "__**Ses Kanalı İstatistikleri**__", value: `\`\`\`md\n${weekvoicestat === `` ? "Kimse yok" : weekvoicestat}\`\`\``}, 
            { name: "__**Mesaj İstatistikleri**__", value: `\`\`\`md\n${weekmsgstat === `` ? "Kimse yok" : weekmsgstat}\`\`\``},
            { name: "__**Komut İstatistikleri**__", value: `\`\`\`md\n${weekcmndstat === `` ? "Kimse yok" : weekcmndstat}\`\`\``},
          )
          .setTimestamp() 

          const SelectMenuArray = [
            {emoji: "📈", label: "Anasayfa", value: "selecttanasayfa"},
            {emoji: "🔊", label: "(1 Gün) Ses Kanalı İstatistikleri", value: "selecttseskanalid"},
            {emoji: "🔊", label: "(2 hafta) Ses Kanalı İstatistikleri", value: "selecttseskanaliw"},
            {emoji: "🔊", label: "(Toplam) Ses Kanalı İstatistikleri", value: "selecttseskanalit"},
            {emoji: "✉️", label: "(1 Gün) Mesaj İstatistikleri", value: "selecttmesajd"},
            {emoji: "✉️", label: "(2 hafta) Mesaj İstatistikleri", value: "selecttmesajw"},
            {emoji: "✉️", label: "(Toplam) Mesaj İstatistikleri", value: "selecttmesajt"},
            {emoji: "⌨️", label: "(1 Gün) Komut İstatistikleri", value: "selecttkomutd"},
            {emoji: "⌨️", label: "(2 hafta) Komut İstatistikleri", value: "selecttkomutw"},
            {emoji: "⌨️", label: "(Toplam) Komut İstatistikleri", value: "selecttkomutt"},
            {emoji: "❌", label: "Mesajı Sil", value: "selecttdelete"}
          ]
          
          const row = new MessageActionRow()
          .setComponents(
              new MessageSelectMenu()
                  .setCustomId("selectmor")
                  .setPlaceholder("Detaylı İstatistikler")
                  .setOptions([SelectMenuArray])      
          )

      interaction.reply({ content: interaction.member.id, embeds: [response2], components: [row], })











      //toplam haftalık günlük olacak. Sadece Kategoriler gözükecek
    }
}