import { Octokit } from "octokit"
import { EmbedBuilder } from "@discordjs/builders"

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
})


export const getCommits = async () => {
    const res = await octokit.request('GET /repos/{owner}/{repo}/commits?per_page=1', {
        owner: "JoaoVitorJJV",
        repo: 'Projetos-UFRA-2023',
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    return res.data
}

export const getCommitsAllTime = async (lastCommit, client) => {
    let getLastCommit = await getCommits()
    if (getLastCommit[0].sha !== lastCommit.sha) {
        const date = new Date(getLastCommit[0].commit.author.date)
        const dataFormatada = date.toLocaleString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
        const embed = new EmbedBuilder()
            .setTitle("🚨 COMMIT DETECTADO! 🚨")
            .setFields({
                name: '\n',
                value: '\n',
            })
            .setColor(0xFFFFFF)
            .setAuthor({
                name: getLastCommit[0].commit.author.name,
                iconURL: getLastCommit[0].author.avatar_url
            })
            .addFields({
                name: getLastCommit[0].commit.message,
                value: `Por ${getLastCommit[0].commit.author.name} - ${dataFormatada}  📅`
            })

        client.channels.cache.get("1081752092861005865").send({ embeds: [embed] })
        return getLastCommit[0]
    }

    return lastCommit
}
