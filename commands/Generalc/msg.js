import fs from 'fs';
import { MessageEmbed } from "discord.js"
export const data = {
    name: "msg",
    description:"Km istatistiklerini verir.",
    cooldown: 5, 
    async execute(interaction) {     

      //const args = interaction.content.slice(process.env.prefix.length+(data.name).length).trim().split(' ')

      const { client } = interaction
      
      const usericntrl = interaction.mentions.users.first() || interaction.author
      const userid = usericntrl.id
      
      let toplammessage = 0
      let haftamesaj = 0
      let günmesaj = 0
      let mesajkanallari = ``

      try {
        const data = fs.readFileSync('./database/totalmessagestatdata.json', 'utf8');
        const jsonData = JSON.parse(data);
      
        const totalmessagecount = jsonData[userid]['totalmessagecount'];
        toplammessage = totalmessagecount
      } catch (err) {
        console.error('Hata:1');
      }
      
      try {
        const data = fs.readFileSync('./database/weekmessagestatdata.json', 'utf8');
        const jsonData = JSON.parse(data);
      
        const totalmessagecount = jsonData[userid]['totalmessagecount'];
        const channelmessagecounts = jsonData[userid]['channelmessagecount'];
      
        const sortedEntries = Object.entries(channelmessagecounts).sort((a, b) => b[1] - a[1]);
      
        for (const [key, value] of sortedEntries) {
          mesajkanallari += `* <#${key}>: \`\`${value} mesaj\`\`\n`
        }
        haftamesaj = totalmessagecount
      } catch (err) {
        console.error('Hata:2');
      }
      
      try {
        const data = fs.readFileSync('./database/daymessagestatdata.json', 'utf8');
        const jsonData = JSON.parse(data);
      
        const totalmessagecount = jsonData[userid]['totalmessagecount'];     

        günmesaj = totalmessagecount
      } catch (err) {
        console.error('Hata:3');
      }
      

      const response = new MessageEmbed()
      .setColor("WHITE")
      .setThumbnail("https://cdn.discordapp.com/attachments/1139752442754514975/1145727794580570172/84e78738590fadd9af486e7c4dad076c.png") 
      .setDescription(`<@${interaction.member.id}> kullanıcısının **Mesaj** istatistikleri.`) 
      .addFields( 
        { name: "__**Toplam Mesaj**__", value: `\`\`\`cs\n${toplammessage} mesaj\n\`\`\` `, inline: true }, 
        { name: "__**Haftalık Mesaj**__", value: `\`\`\`cs\n${haftamesaj} mesaj\n\`\`\` `, inline: true }, 
        { name: "__**Günlük Mesaj**__", value: `\`\`\`cs\n${günmesaj} mesaj\n\`\`\` `, inline: true }, 
        { name: `__**Mesaj Kanal Sıralaması:**__`, value:`${mesajkanallari === `` ? "Veri Yok" : mesajkanallari}`, inline: false }, 
      ) 



      interaction.reply({ embeds: [response], ephemeral: true })











      //toplam haftalık günlük olacak. Sadece Kategoriler gözükecek
    }
}