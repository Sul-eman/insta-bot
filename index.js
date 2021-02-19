const Insta = require("@androz2091/insta.js");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

dotenv.config();

const client = new Insta.Client();

client.on("connected", () => {
	console.log(`Logged in as ${client.user.username}`);
});

client.on("messageCreate", (message) => {
	if (message.author.id === client.user.id) return;

	message.markSeen();
	fetch(
		`http://api.brainshop.ai/get?bid=${process.env.BID}&key=${process.env.BOT_KEY}&uid=${client.user.id}&msg=${message.content}`
	)
		.then((res) => res.json())
		.then((json) => {
			if (!json.cnt) {
				return;
			}
			return message.reply(json.cnt);
		})
		.catch((err) => {});

	// if (message.content === "!ping") {
	// 	message.reply("!pong");
	// }
});

client.login(process.env.INSTA_USER, process.env.PASSWORD);
