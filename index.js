'use strict';

const Discord = require('discord.js');
const botToken = "TOKEN";
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
const versiune = "0.56";

const blacklist = ['pula', 'pizda', 'coaie', 'muie', 'pulă', 'pizdă'];

const language = "RO";

let lang = fs.readFileSync('languages/'+language+'.json', 'utf8');
let lang_t = JSON.parse(lang);

client.on('ready', () => {
	console.log(lang_t['bot_online']);
	client.user.setActivity(activity);
});

client.on('message', message => {
	const args = message.content.slice(prefix.length).split(' ');
	const command = args.shift().toLowerCase();

	for (let i = 0; i < blacklist.length; i++) {
		const elem = blacklist[i];
		if (message['content'].toLowerCase().includes(elem)) {
			if(!admin.includes(message.author["id"])) {
				message.delete().then(message.channel.send(`${message.author} ${lang_t['forbidden_word']}`));
			}
		}
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
		message.channel.send(`${message.author} ${lang_t['has_n_level']} ${userInfo.level}`);
	}

	fs.writeFile("./database.json", JSON.stringify(db), (x) => {
		if (x) console.error(x)
	});

	switch(command) {
		case 'restart': {
			if(admin.includes(message.author["id"])) {
				message.channel.send('Resetting...').then(msg => client.destroy()).then(() => client.login(botToken)).then(client.user.setActivity(activity));
			}else{
				message.channel.send(`${lang_t['no_admin']}`);
			};
			break;
		};
		case 'strawpoll': {
			if (message.member.hasPermission('ADMINISTRATOR')) {
				var strawpoll = message.content.slice(prefix.length).split("strawpoll")[1];

				const Embed = new Discord.MessageEmbed()
				.setTitle(`ℹ️ ${strawpoll}`)
				.setColor('#4086bb')
				.setFooter(`${message.author.username} ${lang_t['strawpoll_owner']}`);

				message.delete().then(async () => {
					await message.channel.send(Embed).then(async message=> {
						await message.react('👍');
						await message.react('👎');
					});
				});
			};
			break;
		};
		case 'purge': {
			if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`${lang_t['no_command_acc']}`);
			if (!args[0]) return message.reply(`${lang_t['use']}: +purge <${lang_t['number']}>`);

			if (Number.isInteger(parseInt(args[0]))) {
				var amount = parseInt(args[0]);
				if(amount > 0) {
					message.channel.bulkDelete(amount).then(() => {
						if (args[0] === '1') {
							message.channel.send(`${lang_t['deleted']} ${args[0]} ${lang_t['messagess']}`).then(msg => msg.delete({ 
								timeout: 3000 
							}));
						} else {
							message.channel.send(`${lang_t['deleted']} ${args[0]} ${lang_t['messagess']}`).then(msg => msg.delete({
								timeout: 3000
							}));
						};
					});
				}
			}else{
				console.log('Nu e număr');
			};
			break;
		};
		case 'ping': {
			message.channel.send(`**PONG! 🏓 ${lang_t['latency']}: ${client.ws.ping}ms**`);
			break;
		};
		case 'infobot': {
			let Embed = new Discord.MessageEmbed()
			.setTitle(`${lang_t['bot_info']}`)
			.setThumbnail(client.user.displayAvatarURL())
			.addField(`${lang_t['bot_name']}:`, client.user.username)
			.addField(`${lang_t['created_at']}:`, client.user.createdAt)
			.addField(`${lang_t['c_using']}:`, "NodeJS", true)
			.addField(`${lang_t['created']}:`, "Adryan#6969", true)
			.addField(`${lang_t['bot_version']}:`, versiune, true)
			.setTimestamp()
			.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
			
			message.channel.send(Embed);
			break;
		};
		case 'duma': {
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
			break;
		};
		case 'cat': {
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
			break;
		};
		case 'dog': {
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
			break;
		};
		case 'adduma': {
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
								message.channel.send(`${lang_t['succ_dum']}`);
							}
						});
					}
				});
			};
			break;
		};
		case 'prost': {
			if(args[0]) {
				const name = message.mentions.users.first();
				message.channel.send(`${name} ${lang_t['is']} ${Math.floor(Math.random() * Math.floor(100))}% ${lang_t['dumbass']}`);
			}else{
				message.channel.send(`${message.author} ${lang_t['you_are']} ${Math.floor(Math.random() * Math.floor(100))}% ${lang_t['dumbass']}`);
			};
			break;
		};
		case 'avatar': {
			if(args[0]) {
				const name = message.mentions.users.first();
				client.users.fetch(name['id']).then(utilizator => {
				    const attachment = new MessageAttachment(utilizator.avatarURL());
				    message.channel.send(attachment);
				});
			}else{
				const attachment = new MessageAttachment(message.author.displayAvatarURL());
				message.channel.send(attachment);
			};
			break;
		};

		case 'ban': {
			if(args[0]) {
				var membru = message.mentions.members.first();
				if(message.member.hasPermission('BAN_MEMBERS')) {
					membru.ban().then((member) => {
						message.channel.send(`:wave: ${member.displayName} ${lang_t['banned_by']} :point_right: ${message.member}`);
					});
				}
			}else{
				message.channel.send(`${lang_t['use_command']} !ban {${lang_t['name']}} ${lang_t['for_ban']}`);
			};
			break;
		};

		case 'kick': {
			if(args[0]) {
				var membru = message.mentions.members.first();
				if(message.member.hasPermission('KICK_MEMBERS')) {
					membru.kick().then((member) => {
						message.channel.send(`:wave: ${member.displayName} ${lang_t['kicked_by']} :point_right: ${message.member}`);
					});
				}
			}else{
				message.channel.send(`${lang_t['use_command']} !kick {${lang_t['name']}} ${lang_t['for_kick']}`);
			};
			break;
		};

	};

});

client.login(botToken);