import fs from 'fs';
import { MessageEmbed, MessageActionRow, MessageSelectMenu } from "discord.js"
export const data = {
    name: "stat",
    description:"Km istatistiklerini verir.",
    cooldown: 5, 
    async execute(interaction) {     
      if (interaction.channel.id !== "1142174288728826018" && interaction.channel.id !== "1142177880101638144" && interaction.channel.id !== "1143202296587636757" && interaction.channel.id !== "1149868781838008370") return

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
      

      try {
        const data = fs.readFileSync('./database/totalvoicestatdata.json', 'utf8');
        const jsonData = JSON.parse(data);
      
        const totalVoiceTime = jsonData[userid]['totalvoicetime'];
        toplamvoice = totalVoiceTime
      } catch (err) {
        console.error('Hata:1');
      }
      
      try {
        const data = fs.readFileSync('./database/weekvoicestatdata.json', 'utf8');
        const jsonData = JSON.parse(data);
      
        const totalVoiceTime = jsonData[userid]['totalvoicetime'];      
      
        haftases = totalVoiceTime
      } catch (err) {
        console.error('Hata:2');
      }
      
      try {
        const data = fs.readFileSync('./database/dayvoicestatdata.json', 'utf8');
        const jsonData = JSON.parse(data);
      
        const totalVoiceTime = jsonData[userid]['totalvoicetime'];      
        günses = totalVoiceTime
      } catch (err) {
        console.error('Hata:3');
      }

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

      const SelectMenuArray = [
        {emoji: "📈", label: "Anasayfa", value: "selectuanasayfa"},
        {emoji: "🔊", label: "Ses Kanalı İstatistikleri", value: "selectuseskanali"},
        {emoji: "✉️", label: "Mesaj İstatistikleri", value: "selectumesaj"},
        {emoji: "❌", label: "Mesajı Sil", value: "selectudelete"}
      ]
      
      const row = new MessageActionRow()
      .setComponents(
          new MessageSelectMenu()
              .setCustomId("selectu")
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


      interaction.channel.send({ content: `${userid} ${interaction.member.id}`, embeds: [response], components: [row] })











      //toplam haftalık günlük olacak. Sadece Kategoriler gözükecek
    }
}