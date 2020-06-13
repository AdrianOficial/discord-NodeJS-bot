'use strict';

const Discord = require('discord.js');
const botToken = "NzE2MTY2NTQ4NDE0NTI5NTU3.XuR8wg.cSWvFVwYiZpvoGnVBBbhlLUm5a0";
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