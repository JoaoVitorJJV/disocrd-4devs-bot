import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Octokit } from "octokit";
import * as dotenv from "dotenv"
dotenv.config()

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
})

const getCommits = async () => {
    const res = await octokit.request('GET /repos/{owner}/{repo}/commits?per_page=25', {
        owner: "JoaoVitorJJV",
        repo: 'Projetos-UFRA-2023',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    return res.data
}

const dataCommits = {
    data: new SlashCommandBuilder()
        .setName('commits')
        .setDescription('Retorna os últimos commits do repositório'),
    async execute(interaction) {
        console.log(interaction.options.getString("input"))
        const commmits = await getCommits()
        const embed = new EmbedBuilder()
            .setTitle("ÚLTIMOS COMMITS - PROJETOS UFRA")
            .setFields({
                name: '\u200B',
                value: '\u200B',
            })
            .setColor(0x0099FF)
            .setDescription("Últimos Commits do Repositório")
        var fields = []

        commmits.map((commits) => {
            const date = new Date(commits.commit.author.date)
            const dataFormatada = date.toLocaleString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            })

            let field = ({
                name: commits.commit.message,
                value: `Por ${commits.commit.author.name} - ${dataFormatada}  📅`
            })
            let emptyField = ({
                name: '\u200B',
                value: '\u200B',
            })

            fields.push(field)
            fields.push(emptyField)
        })
        embed.addFields(fields)
        embed.setTimestamp()
        embed.setFooter({ text: "Últimos 25 resultados" })
        embed.setURL("https://github.com/JoaoVitorJJV/Projetos-UFRA-2023")
        await interaction.reply({ embeds: [embed] });
    }
}

export default dataCommits