const Insta = require("@androz2091/insta.js");
const dotenv = require("dotenv");

dotenv.config();

const client = new Insta.Client();

client.on("connected", () => {
	console.log(`Logged in as ${client.user.username}`);
});

client.on("messageCreate", (message) => {
	if (message.author.id === client.user.id) return;

	message.markSeen();

	if (message.content === "!ping") {
		message.reply("!pong");
	}
});

client.login("simpy4serotonin", process.env.PASSWORD);
