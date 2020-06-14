'use strict';

const Discord = require('discord.js');
const botToken = "NzE2MTY2NTQ4NDE0NTI5NTU3.XuTmKg.ei0TEP5q4bK-18HzQEa8VLWi3cA";
const prefix = "!";
const { MessageAttachment } = require('discord.js');
const activity = "invat NodeJS";
const fs = require('fs');
const client = new Discord.Client();
let db = JSON.parse(fs.readFileSync("./database.json", "utf8"));
const admin = [
	"457785373523836929",
	"304549891055681537"
];
const http = require('http');
const https = require('https');
const versiune = "0.48";

const blacklist = ['pula', 'pizda', 'coaie', 'muie', 'pulă', 'pizdă'];

client.on('ready', () => {
	console.log('Botul este acum online');
	client.user.setActivity(activity);
});

client.on('message', message => {
	const args = message.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();

	for (let i = 0; i < blacklist.length; i++) {
		const elem = blacklist[i];
		if (message['content'].toLowerCase().includes(elem)) message.delete().then(message.channel.send(`${message.author} ai grijă la limbaj!`));
	}

	if (message.author.bot) return;
	
	if (!db[message.author.id]) db[message.author.id] = {
		xp: 0,
		level: 0
	};

	db[message.author.id].xp++;
	let userInfo = db[message.author.id];
	if(userInfo.xp > userInfo.level * 10) {
		userInfo.level++
		userInfo.xp = 0
		message.channel.send(`${message.author} are acum level ${userInfo.level}`);
	}

	fs.writeFile("./database.json", JSON.stringify(db), (x) => {
		if (x) console.error(x)
	});

	if(command === 'restart') {
		if(admin.includes(message.author["id"])) {
			message.channel.send('Resetting...').then(msg => client.destroy()).then(() => client.login(botToken)).then(client.user.setActivity(activity));
		}else{
			message.channel.send(`N-ai admin`);
		}
	}

	if(command === 'strawpoll') {
		if (message.member.hasPermission('ADMINISTRATOR')) {
			var strawpoll = message.content.slice(prefix.length).split("strawpoll")[1];

			const Embed = new Discord.MessageEmbed()
			.setTitle(`ℹ️ ${strawpoll}`)
			.setColor('#4086bb')
			.setFooter(`${message.author.username} a creat acest strawpoll`);

			message.delete().then(async () => {
				await message.channel.send(Embed).then(async message=> {
					await message.react('👍');
					await message.react('👎');
				});
			});
		}

	}

	if(command === 'purge') {
		if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Nu ai acces la această comandă");
		if (!args[0]) return message.reply("Folosește: !purge <număr>");

		if (Number.isInteger(parseInt(args[0]))) {
			var amount = parseInt(args[0]);
			if(amount > 0) {
				message.channel.bulkDelete(amount).then(() => {
					if (args[0] === '1') {
						message.channel.send(`Au fost șterse ${args[0]} mesaje`).then(msg => msg.delete({ 
							timeout: 3000 
						}));
					} else {
						message.channel.send(`Au fost șterse ${args[0]} mesaje`).then(msg => msg.delete({
							timeout: 3000
						}));
					};
				});
			}
		}else{
			console.log('Nu e număr');
		}
	}

	if(command === 'ping') {
		message.channel.send(`**PONG! 🏓 Latenţă: ${client.ws.ping}ms**`);
	}

	if (command === 'infobot') {
		let Embed = new Discord.MessageEmbed()
		.setTitle("Informații BOT")
		.setThumbnail(client.user.displayAvatarURL())
		.addField("Nume bot", client.user.username)
		.addField("Creat pe data de", client.user.createdAt)
		.addField("Creat folosind", "JavaScript, NodeJS, discord.js", true)
		.addField("Creat de", "Adryan#0870", true)
		.addField("Versiunea botului", versiune, true)
		.setTimestamp()
		.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
		
		message.channel.send(Embed);
		
	}


	if(command === 'duma') {
		fs.readFile('dume.json', (err, data) => {
		    if (err) throw err;
		    let datas = JSON.parse(data);
		    const count = datas.dume.push();
		    const randomDuma = Math.floor(Math.random() * Math.floor(count));
		    if(args[0]) {
		    	const name = message.mentions.users.first();
		    	message.channel.send(`${name} ${datas.dume[randomDuma]}`);
		    }else{
		    	message.channel.send(`${message.author} ${datas.dume[randomDuma]}`);
		    }
		});
	}

	if(command === 'cat') {
		let client = http;
		var url = 'http://api.thecatapi.com/v1/images/search';

		client.get(url, (resp) => {
			let data = '';
			resp.on('data', (chunk) => {
				data += chunk;
			});
			resp.on('end', () => {
				var object = JSON.parse(data);
				const attachment = new MessageAttachment(object[0].url);
				message.channel.send(attachment);
			});

		});
	}

	if(command === 'dog') {
		let client = https;
		var url = 'https://api.thedogapi.com/v1/images/search';

		client.get(url, (resp) => {
			let data = '';
			resp.on('data', (chunk) => {
				data += chunk;
			});
			resp.on('end', () => {
				var object = JSON.parse(data);
				const attachment = new MessageAttachment(object[0].url);
				message.channel.send(attachment);
			});

		});
	}

	if(command === 'adduma') {
		if(admin.includes(message.author["id"])) {
			var duma = message.content.slice(prefix.length).split("adduma")[1];
			fs.readFile('dume.json', 'utf8', function (err, data) {
				if (err) {
					console.log(err)
				}else{
					const file = JSON.parse(data);
					file.dume.push(duma);
					const json = JSON.stringify(file);
					fs.writeFile('dume.json', json, 'utf8', function(err){
						if(err){ 
							console.log(err);
						}else{
							message.channel.send(`Duma a fost adăugată cu succes`);
						}
					});
				}
			});
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
		if(admin.includes(message.author["id"])) {
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