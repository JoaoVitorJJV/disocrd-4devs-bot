import { Client, Events, GatewayIntentBits, Collection, ButtonStyle } from "discord.js";
import "./keep_alive.js"
import * as dotenv from "dotenv"
import dataCommits from "./src/commands/github/commits.js";
import dataHelp from "./src/commands/help.js";
import dataHexa from "./src/commands/hexadecimalColors.js";
import dataQuery from "./src/commands/query.js";
import dataPerguntar from "./src/commands/perguntar.js";
import dataPings from "./src/commands/ping.js";
import dataSQL from "./src/commands/sqlDuvidas.js";
import { getCommitsAllTime, getCommits } from "./src/github_api/getCommits.js";
import dataCollaborator from "./src/commands/github/addCollaborator.js";
import dataRemoveColaborator from "./src/commands/github/removeCollaborator.js";
import dataSobre from "./src/commands/sobre.js";
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder } from "@discordjs/builders";

dotenv.config()

var lastCommit = []

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers]
})

const getFirstCommit = async () => {
    const commit = await getCommits()
    lastCommit = commit[0]
}
const getCommitsInterval = () => {
    setInterval(async () => {
        const res = await getCommitsAllTime(lastCommit, client)
        if (res.sha != lastCommit.sha) {
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
client.commands.set(dataQuery.data.name, dataQuery)
client.commands.set(dataCollaborator.data.name, dataCollaborator)
client.commands.set(dataRemoveColaborator.data.name, dataRemoveColaborator)
client.commands.set(dataSobre.data.name, dataSobre)

client.on(Events.InteractionCreate, async interaction => {

    if (interaction.isButton()) {
        if (interaction.customId === 'cmd_btn') {
            const cmd = client.commands.get("help")
            await cmd.execute(interaction)
        }
        const serverRoles = interaction.guild.roles.cache
        const selectedRole = serverRoles.get(interaction.customId)

        if (selectedRole) {
            try {
                const member = interaction.member
                member.roles.add(selectedRole)
                await interaction.reply(`<@${member.id}> agora faz parte do time de ${selectedRole.name}!`);
            }catch(error){
                await interaction.reply('Eu n??o consigo dar esse cargo... ????');
            }
            
        }

    }
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
            await interaction.followUp({ content: 'Houve um erro na execu????o desse comando!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'Houve um erro na execu????o desse comando!', ephemeral: true });
        }
    }

})

client.on(Events.GuildMemberAdd, async member => {
    const buttons = []
    const embed = new EmbedBuilder()
        .setAuthor({
            name: member.displayName,
            iconURL: member.displayAvatarURL()
        })
        .setDescription(`**Bem vindo, ${member.displayName}, clique nos bot??es abaixo para escolher a sua ??rea de atua????o!**`)
        .setImage("https://i.imgur.com/bVSdSmN.jpg")

    const serverRoles = member.guild.roles.cache
    const actionRows = []

    let currentRow = new ActionRowBuilder()
    for (const role of serverRoles.values()) {
        if (role.name == "Front-End" || role.name == "Back-End" || role.name == "Full-Stack") {
            currentRow.addComponents(
                new ButtonBuilder()
                    .setCustomId(role.id)
                    .setLabel(role.name)
                    .setStyle(ButtonStyle.Primary)
            )

            if (currentRow.components.length === 5) {
                actionRows.push(currentRow)
                currentRow = new ActionRowBuilder()
            }
        }
    }
    if (currentRow.components.length > 0) {
        actionRows.push(currentRow)
    }

    await client.channels.cache.get("1081028954556727337").send({ embeds: [embed], components: actionRows })

})

client.login(process.env.BOT_TOKEN)