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
        max_tokens: 60,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["#", ";"],
    })

    return response.data
}


const dataSQL = {
    data: new SlashCommandBuilder()
        .setName('sql')
        .setDescription('Crie row queries, tabelas, e muito mais. Exibe respostas a cerca de SQL')
        .addStringOption(option =>
            option.setName("prompt")
                .setDescription("Faça sua pergunta...")
                .setRequired(true)),
    async execute(interaction) {
        try {
            const input = interaction.options.getString("prompt")
            await interaction.reply(`Pergunta: **${input}** - Aguardando resposta...`);
            const res = await jsHelper(input)
            if (res.error){
                await interaction.followUp('Ocorreu um erro ao tentar processar sua pergunta.');
            }else{
                await interaction.followUp('Resposta: ' + res.choices[0].text.replace(/<code>/g, '```').replace(/<\/code>/g, '```').replace(/\+/g, ''));
            }
            
        } catch (error) {
            console.error(error);
            await interaction.reply('Ocorreu um erro ao tentar processar sua pergunta.');
        }
    }
}

export default dataSQL