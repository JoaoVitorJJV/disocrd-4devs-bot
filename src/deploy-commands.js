import {REST, Routes} from "discord.js"
import dataPings from "./commands/ping.js";
import dataCommits from "./commands/github/commits.js";
import dataPerguntar from "./commands/perguntar.js";
import dataHelp from "./commands/help.js";
import dataHexa from "./commands/hexadecimalColors.js";
import dataSQL from "./commands/sqlDuvidas.js";
import dataCollaborator from "./commands/github/addCollaborator.js";
import * as dotenv from "dotenv"
import dataEstudo from "./commands/noteForStudy.js";
import dataRemoveColaborator from "./commands/github/removeCollaborator.js";
import dataSobre from "./commands/sobre.js";
dotenv.config()

const commands = [];
var cmdLengt = 0

commands.push(dataPings.data.toJSON())
commands.push(dataCommits.data.toJSON())
commands.push(dataHelp.data.toJSON())
commands.push(dataPerguntar.data.toJSON())
commands.push(dataSQL.data.toJSON())
commands.push(dataHexa.data.toJSON())
commands.push(dataEstudo.data.toJSON())
commands.push(dataCollaborator.data.toJSON())
commands.push(dataRemoveColaborator.data.toJSON())
commands.push(dataSobre.data.toJSON())

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

		const dataDev = await rest.put(
			Routes.applicationGuildCommands(process.env.APP_ID, process.env.GUILD_DEV),
			{ body: commands },
		);
		cmdLengt = data.length

		console.log(`Successfully reloaded ${data.length} application (/) commands. Data dev - ${dataDev.length}`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.log(error);
	}
})();

export default cmdLengt