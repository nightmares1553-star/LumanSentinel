const { 
    Client, 
    GatewayIntentBits, 
    EmbedBuilder, 
    PermissionsBitField, 
    ActivityType 
} = require('discord.js');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent
    ] 
});

// Bot başlatıldığında çalışacak kısım
client.on('ready', () => {
    console.log('-------------------------------------------');
    console.log(`Bot başarıyla giriş yaptı: ${client.user.tag}`);
    console.log('Sistem aktif edildi ve komutlar dinleniyor.');
    console.log('-------------------------------------------');
    
    client.user.setActivity('LumanSentinel System', { 
        type: ActivityType.Watching 
    });
});

// Mesajları dinleme ve komut işleme kısmı
client.on('messageCreate', async message => {
    
    // Botun kendi kendine cevap vermesini engelle
    if (message.author.bot) return;
    
    // Sadece ! ile başlayanları al
    if (!message.content.startsWith('!')) return;

    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // 1. GAME INFO KOMUTU
    if (command === 'gameinfo') {
        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('🎮 Game Status')
            .setThumbnail('https://i.imgur.com/OYUN_RESMI_LINKI.png')
            .setDescription('LumanSentinel sunucu durumu güncellendi.')
            .addFields(
                { name: 'Server Name', value: 'LumanSentinel Main', inline: true },
                { name: 'Status', value: 'Active', inline: true },
                { name: 'Players', value: '12/50', inline: true }
            )
            .setTimestamp()
            .setFooter({ text: 'LumanSentinel Bot v1.0' });
            
        message.channel.send({ embeds: [embed] });
    }

    // 2. GROUP INFO KOMUTU
    else if (command === 'groupinfo') {
        const embed = new EmbedBuilder()
            .setColor(0xFFD700)
            .setTitle('📋 Group Information')
            .setThumbnail('https://i.imgur.com/GRUP_PP_LINKI.png')
            .setDescription('Resmi LumanSentinel grubu hakkında bilgiler:')
            .addFields(
                { name: 'Owner', value: 'Founder', inline: true },
                { name: 'Members', value: '150+', inline: true },
                { name: 'Join Date', value: '2026-06-23', inline: true }
            )
            .setTimestamp();
            
        message.channel.send({ embeds: [embed] });
    }

    // 3. ANNOUNCEMENT KOMUTU
    else if (command === 'announcement') {
        const text = args.join(' ');
        if (!text) return message.reply('❌ Lütfen bir duyuru metni gir!');
        
        const embed = new EmbedBuilder()
            .setColor(0xFF0000)
            .setTitle('📢 ANNOUNCEMENT')
            .setDescription(text)
            .setTimestamp();
            
        message.channel.send({ embeds: [embed] });
    }

    // 4. BAN KOMUTU
    else if (command === 'ban') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            return message.reply('❌ Bu komutu kullanmak için yetkin yok.');
        }
        
        const member = message.mentions.members.first();
        if (!member) return message.reply('❌ Lütfen bir kullanıcı etiketle.');
        
        try {
            await member.ban();
            message.channel.send(`🔨 **${member.user.tag}** sunucudan yasaklandı.`);
        } catch (err) {
            message.reply('❌ Kullanıcı yasaklanamadı, yetkim yetmiyor olabilir.');
        }
    }

    // 5. KICK KOMUTU
    else if (command === 'kick') {
        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            return message.reply('❌ Bu komutu kullanmak için yetkin yok.');
        }
        
        const member = message.mentions.members.first();
        if (!member) return message.reply('❌ Lütfen bir kullanıcı etiketle.');
        
        try {
            await member.kick();
            message.channel.send(`👢 **${member.user.tag}** sunucudan atıldı.`);
        } catch (err) {
            message.reply('❌ Kullanıcı atılamadı.');
        }
    }

    // 6. MUTE KOMUTU
    else if (command === 'mute') {
        const member = message.mentions.members.first();
        if (!member) return message.reply('❌ Lütfen bir kullanıcı etiketle.');
        
        message.channel.send(`🔇 **${member.user.tag}** susturuldu (loglandı).`);
    }
});

client.login(process.env.DISCORD_TOKEN);
