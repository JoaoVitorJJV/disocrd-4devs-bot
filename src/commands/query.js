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
        max_tokens: 400,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
    })

    return response.data
}


const dataQuery = {
    data: new SlashCommandBuilder()
        .setName('perguntar')
        .setDescription('Pergunte qualquer coisa (beta)')
        .addStringOption(option =>
            option.setName("prompt")
                .setDescription("Faça sua pergunta...")
                .setRequired(true)),
    async execute(interaction) {
        try {
            const input = interaction.options.getString("prompt")
            await interaction.reply(`Pergunta: **${input}** - Aguardando resposta...`);
            const res = await jsHelper(input)
            await interaction.followUp('Resposta: ' + res.choices[0].text.replace(/<code>/g, '```').replace(/<\/code>/g, '```').replace(/\+/g, ''));
        } catch (error) {
            console.error(error);
            //await interaction.reply('Ocorreu um erro ao tentar processar sua pergunta.');
        }
    }
}

export default dataQuery