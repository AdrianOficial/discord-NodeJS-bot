'use strict';

const Discord = require('discord.js');
const botToken = "NzE2MTY2NTQ4NDE0NTI5NTU3.XuBotw.oTmRjHPzMb-sCbMjdGZde65OM1s";
const prefix = "!";
const { MessageAttachment } = require('discord.js');
const activity = "invat NodeJS";
const fs = require('fs');
const client = new Discord.Client();
const admin = [
	"457785373523836929",
	"304549891055681537"
];

client.on('ready', () => {
	console.log('Botul este acum online');
	client.user.setActivity(activity);
});

client.on('message', message => {
	const args = message.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();

	if(command === 'restart') {
		if(admin.includes(message.author["id"])) {
			message.channel.send('Resetting...').then(msg => client.destroy()).then(() => client.login(botToken)).then(client.user.setActivity(activity));
		}else{
			message.channel.send(`N-ai admin`);
		}
	}

	if (command === 'prost') {
		if(args[0]) {
			const name = message.mentions.users.first();
			message.channel.send(`${name} este ${Math.floor(Math.random() * Math.floor(100))}% prost`);
		}else{
			message.channel.send(`${message.author} esti ${Math.floor(Math.random() * Math.floor(100))}% prost`);
		}
	}

	if (command === 'avatar') {
		if(args[0]) {
			const name = message.mentions.users.first();
			client.users.fetch(name['id']).then(utilizator => {
			    const attachment = new MessageAttachment(utilizator.avatarURL());
			    message.channel.send(attachment);
			});
		}else{
			const attachment = new MessageAttachment(message.author.displayAvatarURL());
			message.channel.send(attachment);
		}
	};

	if (command === 'idle') {
		if (message.member.hasPermission('ADMINISTRATOR')) {
			client.user.setStatus('idle');
			console.log(`${message.member} a folosit comanda !idle`);
			fs.appendFileSync('logs.txt', `${message.member} a folosit comanda !idle
`, function (err) {
				if (err) return console.log(err);
				console.log(`${message.member} a încercat să folosească comanda !idle > logs.txt `);
			});
		}else{
			message.channel.send(`${message.member} nu ai functia de Administrator`);
			console.log(`${message.member} a încercat să folosească comanda !idle`);
			fs.appendFileSync('logs.txt', `${message.member} a încercat să folosească comanda !idle
`, function (err) {
				if (err) return console.log(err);
				console.log(`${message.member} a încercat să folosească comanda !idle > logs.txt `);
			});
		}
	};


	if (command === 'ban') {
		if(args[0]) {
			var membru = message.mentions.members.first();
			if(message.member.hasPermission('BAN_MEMBERS')) {
				membru.ban().then((member) => {
					message.channel.send(`:wave: ${member.displayName} a fost banat cu succes de către :point_right: ${message.member}`);
				});
			}
		}else{
			message.channel.send(`Folosește comanda !ban {nume} pentru a bana un membru.`);
		};

	};

	if (command === 'kick') {
		if(args[0]) {
			var membru = message.mentions.members.first();
			if(message.member.hasPermission('KICK_MEMBERS')) {
				membru.kick().then((member) => {
					message.channel.send(`:wave: ${member.displayName} a primit kick de la :point_right: ${message.member}`);
				});
			}
		}else{
			message.channel.send(`Folosește comanda !kick {nume} pentru a putea da kick unui membru.`);
		};
	};
	
});

client.on('guildMemberAdd', member => {
	const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
	if (!channel) return;
	channel.send(`Salutare, ${member} și bine ai venit pe serverul nostru!`);
});

client.login(botToken);