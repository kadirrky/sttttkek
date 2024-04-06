import fs from 'fs';
import { MessageEmbed } from "discord.js"
export const data = {
    name: "selectt",
    description:"Km istatistiklerini verir.",
    cooldown: 5, 
    async execute(interaction) {    

      const args = interaction.message.content.split(' ')

      if(args[0] !== interaction.member.id) return  

      const {client} = interaction
      const intvalues = `${interaction.values}`
      if (intvalues === "selecttanasayfa"){
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

        const response = new MessageEmbed()
        .setColor("WHITE")      
        .setAuthor({name:"Müzisyenler Haftalık İstatistikler:", iconURL:interaction.guild.iconURL()})
        .addFields( 
          { name: "__**Ses Kanalı İstatistikleri**__", value: `\`\`\`md\n${weekvoicestat === `` ? "Kimse yok" : weekvoicestat}\`\`\``}, 
          { name: "__**Mesaj İstatistikleri**__", value: `\`\`\`md\n${weekmsgstat === `` ? "Kimse yok" : weekmsgstat}\`\`\``},
        )
        .setTimestamp() 
  
  
        await interaction.deferUpdate()
        await interaction.editReply({ embeds: [response]})
      

      } else if(intvalues === "selecttseskanalid"){
        let dayvoicestat = ``    

        try {
          const data = fs.readFileSync('./database/dayvoicestatdata.json', 'utf8');
          const jsonData = JSON.parse(data);

          const sortedKeys = Object.keys(jsonData)
            .sort((a, b) => jsonData[b].totalvoicetime - jsonData[a].totalvoicetime)
            .slice(0, 20);
            
          for (const [index, key] of sortedKeys.entries()) {
              const count = jsonData[key].totalvoicetime;
            const isimcontrol = await client.users.fetch(key)
            const sadeceisim = await isimcontrol.username ? isimcontrol.username : key
            dayvoicestat += `[${index + 1}]: ${sadeceisim}: ${count} dakika\n`;
          }
        } catch (error) {
          console.error('Hata:', error);
        }

        const response3 = new MessageEmbed()
        .setColor("WHITE")
        .setAuthor({name:"Müzisyenler Günlük Ses İstatistikleri:", iconURL:interaction.guild.iconURL()})
        .setDescription(`\`\`\`md\n${dayvoicestat === `` ? "Kimse yok" : dayvoicestat}\`\`\``)
        .setTimestamp() 
        
        await interaction.deferUpdate()
        await interaction.editReply({ embeds: [response3]})

      } else if(intvalues === "selecttseskanaliw"){
        let weekvoicestat = ``    

        try {
          const data = fs.readFileSync('./database/weekvoicestatdata.json', 'utf8');
          const jsonData = JSON.parse(data);

          const sortedKeys = Object.keys(jsonData)
            .sort((a, b) => jsonData[b].totalvoicetime - jsonData[a].totalvoicetime)
            .slice(0, 20);
            
          for (const [index, key] of sortedKeys.entries()) {
              const count = jsonData[key].totalvoicetime;
            const isimcontrol = await client.users.fetch(key)
            const sadeceisim = await isimcontrol.username ? isimcontrol.username : key
            weekvoicestat += `[${index + 1}]: ${sadeceisim}: ${count} dakika\n`;
          }
        } catch (error) {
          console.error('Hata:', error);
        }

        const response3 = new MessageEmbed()
        .setColor("WHITE")
        .setAuthor({name:"Müzisyenler Haftalık Ses İstatistikleri:", iconURL:interaction.guild.iconURL()})
        .setDescription(`\`\`\`md\n${weekvoicestat === `` ? "Kimse yok" : weekvoicestat}\`\`\``)
        .setTimestamp() 
        
        await interaction.deferUpdate()
        await interaction.editReply({ embeds: [response3]})

      } else if(intvalues === "selecttseskanalit"){   

        let totalvoicestat = ``
        try {
          const data = fs.readFileSync('./database/totalvoicestatdata.json', 'utf8');
          const jsonData = JSON.parse(data);

          const sortedKeys = Object.keys(jsonData)
            .sort((a, b) => jsonData[b].totalvoicetime - jsonData[a].totalvoicetime)
            .slice(0, 20); 
            
          for (const [index, key] of sortedKeys.entries()) {
            const count = jsonData[key].totalvoicetime;
            const isimcontrol = await client.users.fetch(key)
            const sadeceisim = await isimcontrol.username ? isimcontrol.username : key
            totalvoicestat += `[${index + 1}]: ${sadeceisim}: ${count} dakika\n`;
          }
        } catch (error) {
          console.error('Hata:', error);
        }


        const response2 = new MessageEmbed()
        .setColor("WHITE")
        .setAuthor({name:"Müzisyenler Toplam Ses İstatistikleri:", iconURL:interaction.guild.iconURL()})
        .setDescription(`\`\`\`md\n${totalvoicestat === `` ? "Kimse yok" : totalvoicestat}\`\`\``)
        .setTimestamp()         
        
        await interaction.deferUpdate()
        await interaction.editReply({ embeds: [response2]})

      } else if(intvalues === "selecttmesajd"){
        let daymsgstat = ``
        try {
          const data = fs.readFileSync('./database/daymessagestatdata.json', 'utf8');
          const jsonData = JSON.parse(data);

          const sortedKeys = Object.keys(jsonData)
            .sort((a, b) => jsonData[b].totalmessagecount - jsonData[a].totalmessagecount)
            .slice(0, 20);
            
          for (const [index, key] of sortedKeys.entries()) {
            const count = jsonData[key].totalmessagecount;
            const isimcontrol = await client.users.fetch(key)
            const sadeceisim = isimcontrol.username ? isimcontrol.username : key
            daymsgstat += `[${index + 1}]: ${sadeceisim}: ${count} mesaj\n`;
          }
        } catch (error) {
          console.error('Hata:', error);
        }        

        const response3 = new MessageEmbed()
        .setColor("WHITE")
        .setAuthor({name:"Müzisyenler Günlük Mesaj İstatistikleri:", iconURL:interaction.guild.iconURL()})
        .setDescription(`\`\`\`md\n${daymsgstat === `` ? "Kimse yok" : daymsgstat}\`\`\``)
        .setTimestamp() 
        
        await interaction.deferUpdate()
        await interaction.editReply({ embeds: [response3]})
      } else if(intvalues === "selecttmesajw"){
        let weekmsgstat = ``
        try {
          const data = fs.readFileSync('./database/weekmessagestatdata.json', 'utf8');
          const jsonData = JSON.parse(data);

          const sortedKeys = Object.keys(jsonData)
            .sort((a, b) => jsonData[b].totalmessagecount - jsonData[a].totalmessagecount)
            .slice(0, 20); 

          for (const [index, key] of sortedKeys.entries()) {
            const count = jsonData[key].totalmessagecount;
            const isimcontrol = await client.users.fetch(key)
            const sadeceisim = isimcontrol.username ? isimcontrol.username : key
            weekmsgstat += `[${index + 1}]: ${sadeceisim}: ${count} mesaj\n`;
          }
        } catch (error) {
          console.error('Hata:', error);
        }

        const response3 = new MessageEmbed()
        .setColor("WHITE")
        .setAuthor({name:"Müzisyenler Haftalık Mesaj İstatistikleri:", iconURL:interaction.guild.iconURL()})
        .setDescription(`\`\`\`md\n${weekmsgstat === `` ? "Kimse yok" : weekmsgstat}\`\`\``)
        .setTimestamp() 
        
        await interaction.deferUpdate()
        await interaction.editReply({ embeds: [response3]})
      } else if(intvalues === "selecttmesajt"){
        let totalmsgstat = ``       

        try {
          const data = fs.readFileSync('./database/totalmessagestatdata.json', 'utf8');
          const jsonData = JSON.parse(data);

          const sortedKeys = Object.keys(jsonData)
            .sort((a, b) => jsonData[b].totalmessagecount - jsonData[a].totalmessagecount)
            .slice(0, 20); 
            
          for (const [index, key] of sortedKeys.entries()) {
            const count = jsonData[key].totalmessagecount;
            const isimcontrol = await client.users.fetch(key)
            const sadeceisim = isimcontrol.username ? isimcontrol.username : key
            totalmsgstat += `[${index + 1}]: ${sadeceisim}: ${count} mesaj\n`;
          }
        } catch (error) {
          console.error('Hata:', error);
        }         

        const response1 = new MessageEmbed()
        .setColor("WHITE")
        .setAuthor({name:"Müzisyenler Tüm Mesaj İstatistikleri:", iconURL:interaction.guild.iconURL()})
        .setDescription(`\`\`\`md\n${totalmsgstat === `` ? "Kimse yok" : totalmsgstat}\`\`\``)
        .setTimestamp() 
        await interaction.deferUpdate()
        await interaction.editReply({ embeds: [response1]})
        
      } else if(intvalues === "selecttdelete"){
        interaction.message.delete()
      }


    }
}