import { SlashCommandBuilder } from "discord.js";
import githubAPI from "../../github_api/requests.js";

const dataRemoveColaborator = {
    data: new SlashCommandBuilder()
        .setName('rem_colaborador')
        .setDescription('Remove um colaborador do repositório')
        .addStringOption(op =>
            op.setName("nickname")
                .setDescription("Nickname do Colaborador")
                .setRequired(true)),
    async execute(interaction) {
        const nickname = interaction.options.getString("nickname")
        const res = await githubAPI.removeCollaborator(nickname)
        if (res.status == 204)
            await interaction.reply(`**${nickname}** foi removido com sucesso do repositório! ✅`)
        else
            await interaction.reply(`Ocorreu um erro, tente novamente.`)
    }
}

export default dataRemoveColaborator