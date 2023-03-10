import { SlashCommandBuilder } from "discord.js";
import { Configuration, OpenAIApi } from "openai";

const jsHelper = async (query) => {
    const config = new Configuration({
        apiKey: process.env.OPEN_AI_TOKEN
    })

    const openai = new OpenAIApi(config)

    const response = await openai.createCompletion({
        model: "code-davinci-002",
        prompt: query,
        temperature: 0,
        max_tokens: 120,
        top_p: 1.0,
        frequency_penalty: 0.5,
        presence_penalty: 0.0,
        stop: ["You:"],
    })

    return response.data
}


const dataPerguntar = {
    data: new SlashCommandBuilder()
        .setName('js')
        .setDescription('Faça perguntas sobre códigos em JavaScript, entre outras.')
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

export default dataPerguntar