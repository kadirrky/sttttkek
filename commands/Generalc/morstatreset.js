import fs from 'fs';
import { MessageEmbed, MessageActionRow, MessageSelectMenu } from "discord.js"
export const data = {
    name: "morstatreset",
    description:"Km istatistiklerinisıfırlar verir.",
    cooldown: 5, 
    async execute(interaction) {     

      const { client } = interaction
      
   if (interaction.channel.id !== "455974157168017409") return

      
          fs.writeFileSync("./databasemorcmnd/weekmessagestatdata.json", "{}", 'utf-8');


          const response2 = new MessageEmbed()
          .setColor("WHITE")      
          .setAuthor({name:"Müzisyenler M.O.R. 2 Haftalık İstatistikler Sıfırlandı", iconURL:interaction.guild.iconURL()})
          .setTimestamp()

      interaction.reply({ embeds: [response2] })
    }
}