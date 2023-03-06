import { SlashCommandBuilder } from "discord.js";
import githubAPI from "../../github_api/requests.js";


const dataCollaborator = {
    data: new SlashCommandBuilder()
        .setName('adc_colaborador')
        .setDescription('Adiciona um novo colaborador a um repositório')
        .addStringOption(op =>
            op.setName("nickname")
                .setDescription("Nickname do Github")
                .setRequired(true)),
    async execute(interaction) {
        const nickname = interaction.options.getString("nickname")

        try {
            const res = await githubAPI.addCollaborator(nickname)
            if (res.status == 201)
                await interaction.reply(`Um convite foi enviado para o email de **${nickname}** ✅`)
            else if (res.status == 204)
                await interaction.reply(`Ocorreu um erro ao adicionar **${nickname}** ao repositório, isso geralmente ocorre quando o usuário já está no time de colaboradores.`)
        }catch(error){
            await interaction.reply(`Ocorreu um erro ao adicionar **${nickname}** ao repositório, essa conta não está registrada no GitHub.`)
        }
        
        
    }
}

export default dataCollaborator