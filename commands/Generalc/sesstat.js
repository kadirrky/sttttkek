import fs from 'fs';
import { MessageEmbed } from "discord.js"
export const data = {
    name: "sesstat",
    description:"Km istatistiklerini verir.",
    cooldown: 5, 
    async execute(interaction) {     
return
      const { client } = interaction
      
        let totalvoicestat = ``
        let weekvoicestat = ``
        let dayvoicestat = ``       

          try {
            const data = fs.readFileSync('./database/totalvoicestatdata.json', 'utf8');
            const jsonData = JSON.parse(data);

            const sortedKeys = Object.keys(jsonData)
              .sort((a, b) => jsonData[b].totalvoicetime - jsonData[a].totalvoicetime)
              .slice(0, 10); 
              
            for (const [index, key] of sortedKeys.entries()) {
              const count = jsonData[key].totalvoicetime;
              const isimcontrol = await client.users.fetch(key)
              const sadeceisim = await isimcontrol.username ? isimcontrol.username : key
              totalvoicestat += `[${index + 1}]: ${sadeceisim}: ${count} dakika\n`;
            }
          } catch (error) {
            console.error('Hata:', error);
          }
          
          try {
            const data = fs.readFileSync('./database/weekvoicestatdata.json', 'utf8');
            const jsonData = JSON.parse(data);

            const sortedKeys = Object.keys(jsonData)
              .sort((a, b) => jsonData[b].totalvoicetime - jsonData[a].totalvoicetime)
              .slice(0, 10); 

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
            const data = fs.readFileSync('./database/dayvoicestatdata.json', 'utf8');
            const jsonData = JSON.parse(data);

            const sortedKeys = Object.keys(jsonData)
              .sort((a, b) => jsonData[b].totalvoicetime - jsonData[a].totalvoicetime)
              .slice(0, 10);
              
            for (const [index, key] of sortedKeys.entries()) {
                const count = jsonData[key].totalvoicetime;
              const isimcontrol = await client.users.fetch(key)
              const sadeceisim = await isimcontrol.username ? isimcontrol.username : key
              dayvoicestat += `[${index + 1}]: ${sadeceisim}: ${count} dakika\n`;
            }
          } catch (error) {
            console.error('Hata:', error);
          }
          
//           const response = new MessageEmbed()
//           .setColor("WHITE")
//           .setAuthor({name:"Müzisyenler Ses İstatistikleri:", iconURL:interaction.guild.iconURL()})
//           .setDescription(`
// __**Tüm İstatistikler:**__\`\`\`md\n${totalvoicestat === `` ? "Kimse yok" : totalvoicestat}\`\`\`\n
// __**Haftalık İstatistikler:**__\n\`\`\`md\n${weekvoicestat === `` ? "Kimse yok" : weekvoicestat}\`\`\`\n
// __**Günlük İstatistikler:**__\n\`\`\`md\n${dayvoicestat === `` ? "Kimse yok" : dayvoicestat}\`\`\``)
//           .setTimestamp() 


          const response1 = new MessageEmbed()
          .setColor("WHITE")
          .setAuthor({name:"Müzisyenler Tüm Ses İstatistikleri:", iconURL:interaction.guild.iconURL()})
          .setDescription(`\`\`\`md\n${totalvoicestat === `` ? "Kimse yok" : totalvoicestat}\`\`\``)
          .setTimestamp() 
          const response2 = new MessageEmbed()
          .setColor("WHITE")
          .setAuthor({name:"Müzisyenler Haftalık Ses İstatistikleri:", iconURL:interaction.guild.iconURL()})
          .setDescription(`\`\`\`md\n${weekvoicestat === `` ? "Kimse yok" : weekvoicestat}\`\`\``)
          .setTimestamp() 
          const response3 = new MessageEmbed()
          .setColor("WHITE")
          .setAuthor({name:"Müzisyenler Günlük Ses İstatistikleri:", iconURL:interaction.guild.iconURL()})
          .setDescription(`\`\`\`md\n${dayvoicestat === `` ? "Kimse yok" : dayvoicestat}\`\`\``)
          .setTimestamp() 

      interaction.reply({ embeds: [response1,response2,response3], ephemeral: true })











      //toplam haftalık günlük olacak. Sadece Kategoriler gözükecek
    }
}