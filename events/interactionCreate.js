import cooldown_control from "../utils/cooldown_control.js";
import register_commands from "../utils/bot/register_commands.js";
export default client => {

    const { embed } = client
    client.on('interactionCreate', interaction => {
        // await register_commands(interaction.guild)

        if (!interaction.isButton() && !interaction.isSelectMenu() && !interaction.isApplicationCommand()) return

        const command = client.commands.get(interaction.commandName || interaction.customId)
        if(!command) return

        // Cooldown Control
        const cooldown = cooldown_control(command, interaction.member.id)
        if(cooldown) return interaction.reply({
            embeds: [
                embed(`Bu komutu tekrar kullanmak için \`${cooldown}\` saniye beklemelisiniz.`,"RED")
            ], ephemeral: true 
        })

        //Ececute Command
        try{
            command.data.execute(interaction)
        } catch(e){
            interaction.reply({ embeds: [ embed(`Bu komutu kullanırken bir hata oluştu.`,"RED") ] })
            console.log(e)
        }

    });

}