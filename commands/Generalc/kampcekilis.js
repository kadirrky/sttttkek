import fs from 'fs';
import { MessageEmbed, MessageActionRow, MessageSelectMenu } from "discord.js"
export const data = {
    name: "kampcekilis",
    description:"kamp çekiliş yapar.",
    cooldown: 5, 
    async execute(interaction) {
      if (interaction.channel.id !== "1142175786556719205" && interaction.channel.id !== "1142175813991669761" && interaction.channel.id !== "1144376961209209024") return
      const { client } = interaction
      
        let weekvoicestat = ``
        let weekmsgstat = ``
        let winner = `0`
          try {
// Dosya yolu
const dosyaYolu = './databasea/kampvoicestatdata.json';

// Dosyayı oku ve içeriğini JSON olarak ayrıştır
fs.readFile(dosyaYolu, (hata, veri) => {
  if (hata) {
    console.error('Dosya okuma hatası:', hata);
    return;
  }

  try {
    const veriObjesi = JSON.parse(veri);

    // 60 ve üstü olanları sırala
    const uygunKatilimcilar = [];
    for (const anahtar in veriObjesi) {        
      if (veriObjesi.hasOwnProperty(anahtar) && veriObjesi[anahtar].totalvoicetime >= 90) {
        uygunKatilimcilar.push({ id: anahtar, totalvoicetime: veriObjesi[anahtar].totalvoicetime });
      }
    }
    if (uygunKatilimcilar.length === 0) {
      console.log('60 ve üstü olan katılımcı bulunamadı.');
      return;
    }

    // Rastgele bir kazanan seç
    const kazananIndex = Math.floor(Math.random() * uygunKatilimcilar.length);
    const kazanan = uygunKatilimcilar[kazananIndex];

    console.log('90 dakika ve üstü olan katılımcılar:');
    let uygn = ``
    uygn += uygunKatilimcilar.map(item => `<@${item.id}>`).join(',');
      console.log(uygunKatilimcilar);
      console.log("Kazanan:"+kazanan.id);
              const response2 = new MessageEmbed()
          .setColor("WHITE")      
          .setAuthor({name:"Müzisyenler Çekiliş Sonucu:", iconURL:interaction.guild.iconURL()})
          .addFields(             
            { name: "__**Katılımcılar (90dk)**__", value: `${uygn}`},
            { name: "__**Kazanan**__", value: `<@${kazanan.id}>`},
          )
          .setTimestamp()

      interaction.reply({ content: interaction.member.id, embeds: [response2] })
  } catch (parseHata) {
    console.error('JSON ayrıştırma hatası:', parseHata);
  }
});
            
            
          } catch (error) {
            console.error('Hata:', error);
          }



      //toplam haftalık günlük olacak. Sadece Kategoriler gözükecek
    }
}