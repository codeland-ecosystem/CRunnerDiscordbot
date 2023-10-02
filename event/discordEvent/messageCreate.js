require("dotenv").config();
const channelID = process.env.CHANNEL_ID;
const { toDiscordChat } = require("../../functions/toDiscord.js");
const { toAPI } = require("../../functions/toAPI.js");

const LangMAP = [
	{py : "python3"},
	{js : "node"},
	{C : "gcc -xc -o run1 - && ./run1"},
	{bash : "bash"}
]

module.exports = {
	name: "messageCreate",
	once: false,
	async execute(message , client) {
		// Send message to the Minecraft server if the message is not from the bot
		/* Read markdown message and pass to API */
		/* wait for user to ping bot to get args*/
		
		try {
			/*
			const regex = new RegExp(/^a...s$/);
			console.log(regex.test('alias')); //
			*/
			const codeBlockRegex = /```(\w+)\n([\s\S]+?)\n```/;
			const hasRegex = codeBlockRegex.exec(message.content);
			const MentionBot = message.mentions.has(client.user)
			
			if (hasRegex && MentionBot){
				//console.log(hasRegex[1]) //py
				//console.log(hasRegex[2]) //code		
				//toDiscordChat(hasRegex[2])
				const langMap = new Map();

				LangMAP.forEach(entry => {
					const key = Object.keys(entry)[0]
					const value = entry[key]; // Get the corresponding value
					langMap.set(key, value); // Add the entry to the Map

				})
				if (hasRegex)
				{ 
					let lang = (langMap.get(hasRegex[1]))
					let code = hasRegex[2]
					toAPI(lang , code)

				}
				/* pass code to toAPI func*/
			}
			else{
				return;
			}



			//todiscord ?
		} catch (error) {
			console.log(error);
		}
	},
};
 