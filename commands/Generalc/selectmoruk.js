import fs from 'fs';
import { MessageEmbed } from "discord.js"
export const data = {
    name: "selectmoruk",
    description:"Km istatistiklerini verir.",
    cooldown: 5, 
    async execute(interaction) {     

      const args = interaction.message.content.split(' ')

      if(args[1] !== interaction.member.id) return  

      const { client } = interaction
      
      const userid = args[0]    
      const useravat = await client.users.fetch(userid);
      const avatarURL = useravat.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 });

      const intvalues = `${interaction.values}`
      if (intvalues === "selectmorukanasayfa"){
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

        const response = new MessageEmbed()
        .setColor("WHITE")
        .setThumbnail(avatarURL) 
        .setDescription(`<@${userid}> kullanıcısının **Ses Kanalı**, **Mesaj** ve **Komut** istatistikleri.`) 
        .addFields( 
          { name: "__**Toplam Ses**__", value: `\`\`\`cs\n${toplamvoice} dk\n\`\`\` `, inline: true }, 
          { name: "__**2 Haftalık Ses**__", value: `\`\`\`cs\n${haftases} dk\n\`\`\` `, inline: true }, 
          { name: "__**Günlük Ses**__", value: `\`\`\`cs\n${günses} dk\n\`\`\` `, inline: true }, 
        )
        .addFields( 
          { name: "__**Toplam Mesaj**__", value: `\`\`\`cs\n${toplammessage} mesaj\n\`\`\` `, inline: true }, 
          { name: "__**2 Haftalık Mesaj**__", value: `\`\`\`cs\n${haftamesaj} mesaj\n\`\`\` `, inline: true }, 
          { name: "__**Günlük Mesaj**__", value: `\`\`\`cs\n${günmesaj} mesaj\n\`\`\` `, inline: true }, 
        ) 
        .addFields( 
          { name: "__**Toplam Komut**__", value: `\`\`\`cs\n${toplamkomut} komut\n\`\`\` `, inline: true }, 
          { name: "__**2 Haftalık Komut**__", value: `\`\`\`cs\n${haftakomut} komut\n\`\`\` `, inline: true }, 
          { name: "__**Günlük Komut**__", value: `\`\`\`cs\n${günkomut} komut\n\`\`\` `, inline: true }, 
        ) 
  
  
        await interaction.deferUpdate()
        await interaction.editReply({ embeds: [response]})

      } else if(intvalues === "selectmorukseskanali"){

        let toplamvoice = 0
        let haftases = 0
        let günses = 0
        let seskanallari = ``   

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
          const channelVoiceTimes = jsonData[userid]['channelvoicetime'];
        
          const sortedEntries = Object.entries(channelVoiceTimes).sort((a, b) => b[1] - a[1]);
        
          for (const [key, value] of sortedEntries) {
            seskanallari += `* <#${key}>: \`\`${value} dakika\`\`\n`
          }
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
  
        const response1 = new MessageEmbed()
        .setColor("WHITE")
        .setThumbnail(avatarURL) 
        .setDescription(`<@${userid}> kullanıcısının **Ses Kanalı** istatistikleri.`) 
        .addFields( 
          { name: "__**Toplam Ses**__", value: `\`\`\`cs\n${toplamvoice} dk\n\`\`\` `, inline: true }, 
          { name: "__**2 Haftalık Ses**__", value: `\`\`\`cs\n${haftases} dk\n\`\`\` `, inline: true }, 
          { name: "__**Günlük Ses**__", value: `\`\`\`cs\n${günses} dk\n\`\`\` `, inline: true }, 
          { name: `__**Ses Kategori Sıralaması:**__`, value:`${seskanallari === `` ? "Veri Yok" : seskanallari}`, inline: false }, 
        )

        await interaction.deferUpdate()
        await interaction.editReply({ embeds: [response1]})

      } else if(intvalues === "selectmorukmesaj"){
      
        let toplammessage = 0
        let haftamesaj = 0
        let günmesaj = 0
        let mesajkanallari = ``

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
          const data = fs.readFileSync('./databasemor/daymessagestatdata.json', 'utf8');
          const jsonData = JSON.parse(data);
        
          const totalmessagecount = jsonData[userid]['totalmessagecount'];     
  
          günmesaj = totalmessagecount
        } catch (err) {
          console.error('Hata:3');
        }

        const response2 = new MessageEmbed()
        .setColor("WHITE")
        .setThumbnail(avatarURL) 
        .setDescription(`<@${userid}> kullanıcısının **Mesaj** istatistikleri.`) 
        .addFields( 
          { name: "__**Toplam Mesaj**__", value: `\`\`\`cs\n${toplammessage} mesaj\n\`\`\` `, inline: true }, 
          { name: "__**2 Haftalık Mesaj**__", value: `\`\`\`cs\n${haftamesaj} mesaj\n\`\`\` `, inline: true }, 
          { name: "__**Günlük Mesaj**__", value: `\`\`\`cs\n${günmesaj} mesaj\n\`\`\` `, inline: true }, 
          { name: `__**Mesaj Kanal Sıralaması:**__`, value:`${mesajkanallari === `` ? "Veri Yok" : mesajkanallari}`, inline: false }, 
        ) 
        
        await interaction.deferUpdate()
        await interaction.editReply({ embeds: [response2] })

      } else if(intvalues === "selectmorukkomut"){
      
        let toplammessage = 0
        let haftamesaj = 0
        let günmesaj = 0
        let mesajkanallari = ``

        try {
          const data = fs.readFileSync('./databasemorcmnd/totalmessagestatdata.json', 'utf8');
          const jsonData = JSON.parse(data);
        
          const totalmessagecount = jsonData[userid]['totalmessagecount'];
          toplammessage = totalmessagecount
        } catch (err) {
          console.error('Hata:1');
        }
        
        try {
          const data = fs.readFileSync('./databasemorcmnd/weekmessagestatdata.json', 'utf8');
          const jsonData = JSON.parse(data);
        
          const totalmessagecount = jsonData[userid]['totalmessagecount'];
          const channelmessagecounts = jsonData[userid]['channelmessagecount'];
        
          const sortedEntries = Object.entries(channelmessagecounts).sort((a, b) => b[1] - a[1]);
        
          for (const [key, value] of sortedEntries) {
            mesajkanallari += `* ${key}: \`\`${value} komut\`\`\n`
          }
          haftamesaj = totalmessagecount
        } catch (err) {
          console.error('Hata:2');
        }
        
        try {
          const data = fs.readFileSync('./databasemorcmnd/daymessagestatdata.json', 'utf8');
          const jsonData = JSON.parse(data);
        
          const totalmessagecount = jsonData[userid]['totalmessagecount'];     
  
          günmesaj = totalmessagecount
        } catch (err) {
          console.error('Hata:3');
        }

        const response2 = new MessageEmbed()
        .setColor("WHITE")
        .setThumbnail(avatarURL) 
        .setDescription(`<@${userid}> kullanıcısının **Mesaj** istatistikleri.`) 
        .addFields( 
          { name: "__**Toplam Komut**__", value: `\`\`\`cs\n${toplammessage} komut\n\`\`\` `, inline: true }, 
          { name: "__**2 Haftalık Komut**__", value: `\`\`\`cs\n${haftamesaj} komut\n\`\`\` `, inline: true }, 
          { name: "__**Günlük Komut**__", value: `\`\`\`cs\n${günmesaj} komut\n\`\`\` `, inline: true }, 
          { name: `__**Komut Argüman Sıralaması:**__`, value:`${mesajkanallari === `` ? "Veri Yok" : mesajkanallari}`, inline: false }, 
        ) 
        
        await interaction.deferUpdate()
        await interaction.editReply({ embeds: [response2] })

      } else if(intvalues === "selectmorukdelete"){
        interaction.message.delete()
      }


    }
}