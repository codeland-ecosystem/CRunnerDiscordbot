require("dotenv").config();
const channel = process.env.CHANNEL_ID;
const { toDiscordChat , toReplyUser} = require("../../functions/toDiscord.js");
const { toAPI , toThreadAPI } = require("../../functions/toAPI.js");

const LangMAP = [
	{py : "python3"},
	{js : "node"},
	{c : "gcc -xc -o run1 - && ./run1"},
	{bash : "bash"},
	{php : "php"},
	{powershell : "pwsh -NonInteractive"},
	{lua : "lua"},
	{markdown : "pandoc -f markdown -t html"},
	{rust : "rustc -o run1 - && ./run1"},
	{perl : "perl"},
	{brainfuck : "/tmp/br.run; bf /tmp/br.run"},
	{golang : "/tmp/run.go; go run /tmp/run.go"},
]

module.exports = {
	name: "messageCreate",
	once: false,
	async execute(message , client) {
		try {
			if (message.author.bot) return

			const codeBlockRegex = /```(\w+)\n([\s\S]+?)```/;
			const hasRegex = codeBlockRegex.exec(message.content);
			const MentionBot = message.mentions.has(client.user)
			if (message.channel.isThread() && hasRegex && MentionBot) {
				/*
				pass message to threadapi
				*/
				const langMap = new Map();

				LangMAP.forEach(entry => {
					const key = Object.keys(entry)[0] //py
					const value = entry[key]; // Get the corresponding value accordingly like py -> python3
					langMap.set(key, value); // Add the entry to the Map

				})
				let lang = (langMap.get(hasRegex[1])) //python3
				let code = hasRegex[2] //user code

				console.log(lang)
				console.log(code)
				//passing message for easy .reply function
				toThreadAPI(lang , code , message)
				//message.reply("test")
			}
			else if (hasRegex && MentionBot){
				const langMap = new Map();

				LangMAP.forEach(entry => {
					const key = Object.keys(entry)[0] //py
					const value = entry[key]; // Get the corresponding value accordingly like py -> python3
					langMap.set(key, value); // Add the entry to the Map

				})
				
					let lang = (langMap.get(hasRegex[1])) //python3
					let code = hasRegex[2] //user code
					/* pass code to toAPI func*/
					let messageID = message.id;
					toAPI(lang , code , messageID)

			}
			else if(MentionBot) 
				//toDiscordChat("**Please use proper MARKDOWN and mention the bot**")
				toReplyUser("**Please use proper MARKDOWN and mention the bot. The format is **" + "https://discord.718it.codeland.us/image/" , message.id)
				return;
		
		} catch (error) {
			console.log(error);
		}
	},
};
 