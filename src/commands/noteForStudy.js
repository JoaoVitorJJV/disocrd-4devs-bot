import { SlashCommandBuilder } from "discord.js";
import { Configuration, OpenAIApi } from "openai";

const jsHelper = async (query) => {
    const config = new Configuration({
        apiKey: process.env.OPEN_AI_TOKEN
    })

    const openai = new OpenAIApi(config)

    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: query,
        temperature: 0.3,
        max_tokens: 250,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    })

    return response.data
}


const dataEstudo = {
    data: new SlashCommandBuilder()
        .setName('estudar')
        .setDescription('Exibe os tópicos que você precisa estudar sobre determinado assunto..')
        .addStringOption(option =>
            option.setName("prompt")
                .setDescription("Faça sua pergunta...")
                .setRequired(true)),
    async execute(interaction) {
        try {
            await interaction.deferReply();
            const input = interaction.options.getString("prompt")
            const res = await jsHelper(input)
            await interaction.editReply('Resposta: ' + res.choices[0].text.replace(/<code>/g, '```').replace(/<\/code>/g, '```').replace(/\+/g, ''));
        } catch (error) {
            console.error(error);
            //await interaction.reply('Ocorreu um erro ao tentar processar sua pergunta.');
        }
    }
}

export default dataEstudo