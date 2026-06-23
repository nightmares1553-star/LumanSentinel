const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

// Buraya botun için yazdığın diğer komutları (moderasyon, oyun bilgisi vb.) ekleyeceksin

client.on('ready', () => {
  console.log(`${client.user.tag} olarak giriş yapıldı!`);
});

// TOKEN KISMI
client.login(process.env.DISCORD_TOKEN);
