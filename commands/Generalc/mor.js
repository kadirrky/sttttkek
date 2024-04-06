import fs from 'fs';
import { MessageEmbed, MessageActionRow, MessageSelectMenu } from "discord.js"
export const data = {
    name: "mor",
    description:"Km istatistiklerini verir.",
    cooldown: 5, 
    async execute(interaction) {     

      //const args = interaction.content.slice(process.env.prefix.length+(data.name).length).trim().split(' ')
      const { client } = interaction

      const usericntrl = interaction.mentions.users.first() || interaction.author
      const userid = usericntrl.id
      const useravat = await client.users.fetch(userid);
      const avatarURL = useravat.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });
      
      let toplamvoice = 0
      let haftases = 0
      let günses = 0
      
      let toplammessage = 0
      let haftamesaj = 0
      let günmesaj = 0

      let toplamkomut = 0
      let haftakomut = 0
      let günkomut = 0
      

      try {
        const data = fs.readFileSync('./databasemor/totalvoicestatdata.json', 'utf8');
        const jsonData = JSON.parse(data);
      
        const totalVoiceTime = jsonData[userid]['totalvoicetime'];
        toplamvoice = totalVoiceTime
      } catch (err) {
        console.error('Hata:1');
      }
      
      try {
        const data = fs.readFileSync('./databasemor/weekvoicestatdata.json', 'utf8');
        const jsonData = JSON.parse(data);
      
        const totalVoiceTime = jsonData[userid]['totalvoicetime'];      
      
        haftases = totalVoiceTime
      } catch (err) {
        console.error('Hata:2');
      }
      
      try {
        const data = fs.readFileSync('./databasemor/dayvoicestatdata.json', 'utf8');
        const jsonData = JSON.parse(data);
      
        const totalVoiceTime = jsonData[userid]['totalvoicetime'];      
        günses = totalVoiceTime
      } catch (err) {
        console.error('Hata:3');
      }

      try {
        const data = fs.readFileSync('./databasemor/totalmessagestatdata.json', 'utf8');
        const jsonData = JSON.parse(data);
      
        const totalmessagecount = jsonData[userid]['totalmessagecount'];
        toplammessage = totalmessagecount
      } catch (err) {
        console.error('Hata:1');
      }
      
      try {
        const data = fs.readFileSync('./databasemor/weekmessagestatdata.json', 'utf8');
        const jsonData = JSON.parse(data);
      
        const totalmessagecount = jsonData[userid]['totalmessagecount'];     

        haftamesaj = totalmessagecount
      } catch (err) {
        console.error('Hata:2');
      }
      
      try {
        const data = fs.readFileSync('./databasemor/daymessagestatdata.json', 'utf8');
        const jsonData = JSON.parse(data);
      
        const totalmessagecount = jsonData[userid]['totalmessagecount'];     

        günmesaj = totalmessagecount
      } catch (err) {
        console.error('Hata:3');
      }

      try {
        const data = fs.readFileSync('./databasemorcmnd/totalmessagestatdata.json', 'utf8');
        const jsonData = JSON.parse(data);
      
        const totalmessagecount = jsonData[userid]['totalmessagecount'];
        toplamkomut = totalmessagecount
      } catch (err) {
        console.error('Hata:1');
      }
      
      try {
        const data = fs.readFileSync('./databasemorcmnd/weekmessagestatdata.json', 'utf8');
        const jsonData = JSON.parse(data);
      
        const totalmessagecount = jsonData[userid]['totalmessagecount'];     

        haftakomut = totalmessagecount
      } catch (err) {
        console.error('Hata:2');
      }
      
      try {
        const data = fs.readFileSync('./databasemorcmnd/daymessagestatdata.json', 'utf8');
        const jsonData = JSON.parse(data);
      
        const totalmessagecount = jsonData[userid]['totalmessagecount'];     

        günkomut = totalmessagecount
      } catch (err) {
        console.error('Hata:3');
      }

      const SelectMenuArray = [
        {emoji: "📈", label: "Anasayfa", value: "selectmorukanasayfa"},
        {emoji: "🔊", label: "Ses Kanalı İstatistikleri", value: "selectmorukseskanali"},
        {emoji: "✉️", label: "Mesaj İstatistikleri", value: "selectmorukmesaj"},
        {emoji: "⌨️", label: "Komut İstatistikleri", value: "selectmorukkomut"},
        {emoji: "❌", label: "Mesajı Sil", value: "selectmorukdelete"}
      ]
      
      const row = new MessageActionRow()
      .setComponents(
          new MessageSelectMenu()  
              .setCustomId("selectmoruk")
              .setPlaceholder("Detaylı İstatistikler")
              .setOptions([SelectMenuArray])      
      )

      const response = new MessageEmbed()
      .setColor("WHITE")
      .setThumbnail(avatarURL) 
      .setDescription(`<@${userid}> kullanıcısının **Ses Kanalı** ve **Mesaj** istatistikleri.`) 
      .addFields( 
        { name: "__**Toplam Ses**__", value: `\`\`\`cs\n${toplamvoice} dk\n\`\`\` `, inline: true }, 
        { name: "__**Haftalık Ses**__", value: `\`\`\`cs\n${haftases} dk\n\`\`\` `, inline: true }, 
        { name: "__**Günlük Ses**__", value: `\`\`\`cs\n${günses} dk\n\`\`\` `, inline: true }, 
      )
      .addFields( 
        { name: "__**Toplam Mesaj**__", value: `\`\`\`cs\n${toplammessage} mesaj\n\`\`\` `, inline: true }, 
        { name: "__**Haftalık Mesaj**__", value: `\`\`\`cs\n${haftamesaj} mesaj\n\`\`\` `, inline: true }, 
        { name: "__**Günlük Mesaj**__", value: `\`\`\`cs\n${günmesaj} mesaj\n\`\`\` `, inline: true }, 
      ) 
      .addFields( 
        { name: "__**Toplam Komut**__", value: `\`\`\`cs\n${toplamkomut} komut\n\`\`\` `, inline: true }, 
        { name: "__**Haftalık Komut**__", value: `\`\`\`cs\n${haftakomut} komut\n\`\`\` `, inline: true }, 
        { name: "__**Günlük Komut**__", value: `\`\`\`cs\n${günkomut} komut\n\`\`\` `, inline: true }, 
      ) 


      interaction.reply({ content: `${userid} ${interaction.member.id}`, embeds: [response], components: [row] })











      //toplam haftalık günlük olacak. Sadece Kategoriler gözükecek
    }
}