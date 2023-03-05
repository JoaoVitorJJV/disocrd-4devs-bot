import { Client, Events, GatewayIntentBits, Collection } from "discord.js";
import "./keep_alive.js"
import * as dotenv from "dotenv"
import dataCommits from "./src/commands/commits.js";
import dataHelp from "./src/commands/help.js";
import dataHexa from "./src/commands/hexadecimalColors.js";
import dataEstudo from "./src/commands/noteForStudy.js";
import dataPerguntar from "./src/commands/perguntar.js";
import dataPings from "./src/commands/ping.js";
import dataSQL from "./src/commands/sqlDuvidas.js";
import { getCommitsAllTime, getCommits } from "./src/github_api/getCommits.js";

dotenv.config()

var lastCommit = []

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
})

const getFirstCommit = async () => {
    const commit = await getCommits()
    lastCommit = commit[0]
}
const getCommitsInterval = () => {
    setInterval(async () => {
        const res = await getCommitsAllTime(lastCommit, client)
        if(res.sha != lastCommit.sha){
            lastCommit = res
        }
    }, 5000)
   
}

client.on(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`)
    c.user.setPresence({
        activities: [{
            name: "VALORANT | /help",
        }],
        status: "online"
    })
    getFirstCommit()
    getCommitsInterval()
})

client.commands = new Collection()
client.commands.set(dataPings.data.name, dataPings)
client.commands.set(dataCommits.data.name, dataCommits)
client.commands.set(dataHelp.data.name, dataHelp)
client.commands.set(dataPerguntar.data.name, dataPerguntar)
client.commands.set(dataSQL.data.name, dataSQL)
client.commands.set(dataHexa.data.name, dataHexa)
client.commands.set(dataEstudo.data.name, dataEstudo)

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`Nenhum comando do tipo ${interaction.commandName} foi encontrado.`);
        return;
    }

    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'Houve um erro na execução desse comando!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'Houve um erro na execução desse comando!', ephemeral: true });
        }
    }

})

client.login(process.env.BOT_TOKEN)