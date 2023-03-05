import { Client, Events, GatewayIntentBits, Collection } from "discord.js";
import * as dotenv from "dotenv"
import dataCommits from "./src/commands/commits.js";
import dataHelp from "./src/commands/help.js";
import dataPings from "./src/commands/ping.js";
import { getCommitsAllTime, getCommits } from "./src/github_api/getCommits.js";
import { Configuration, OpenAIApi } from "openai";

dotenv.config()

var lastCommit = []

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
})

const jsHelper = async () => {
    const config = new Configuration({
        apiKey: process.env.OPEN_AI_TOKEN
    })

    const openai = new OpenAIApi(config)

    const response = await openai.createCompletion({
        model: "code-davinci-002",
        prompt: "O que é a Hipotenusa?",
        temperature: 0,
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: ["You:"],
    })

    // console.log(response.data)
    // console.log(response.data.choices)
}

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
            name: "Valorant | /help",
        }],
        status: "online"
    })
    getFirstCommit()
    getCommitsInterval()
    jsHelper()
})

client.commands = new Collection()
client.commands.set(dataPings.data.name, dataPings)
client.commands.set(dataCommits.data.name, dataCommits)
client.commands.set(dataHelp.data.name, dataHelp)

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