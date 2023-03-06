import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import githubAPI from "../../github_api/requests.js";


const dataCommits = {
    data: new SlashCommandBuilder()
        .setName('commits')
        .setDescription('Retorna os últimos commits do repositório'),
    async execute(interaction) {
        const commmits = await githubAPI.getCommits()
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