
import {REST, Routes} from "discord.js"
import dataPings from "./commands/ping.js";
import dataCommits from "./commands/commits.js";
import * as dotenv from "dotenv"
import dataHelp from "./commands/help.js";
dotenv.config()

const commands = [];

commands.push(dataPings.data.toJSON())
commands.push(dataCommits.data.toJSON())
commands.push(dataHelp.data.toJSON())

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_ID),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.log(error);
	}
})();