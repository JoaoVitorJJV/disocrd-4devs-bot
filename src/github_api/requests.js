import { Octokit } from "octokit";
import * as dotenv from "dotenv"
dotenv.config()

const octokit = new Octokit({
    auth: process.env.GITHUB_TOKEN
})

const githubAPI = {
    addCollaborator: async (nickname) => {
        const res = await octokit.request('PUT /repos/{owner}/{repo}/collaborators/{username}', {
            owner: "JoaoVitorJJV",
            repo: "Projetos-UFRA-2023",
            username: nickname,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
    
        return res
    },
    removeCollaborator: async (colaborator) => {
        const res = await octokit.request('PUT /repos/{owner}/{repo}/collaborators/{username}', {
            owner: "JoaoVitorJJV",
            repo: "Projetos-UFRA-2023",
            username: colaborator,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
    
        return res
    },
    getCommits: async () => {
        const res = await octokit.request('GET /repos/{owner}/{repo}/commits?per_page=25', {
            owner: "JoaoVitorJJV",
            repo: 'Projetos-UFRA-2023',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
    
        return res.data
    }
}

export default githubAPI
