import { SlashCommandBuilder } from "discord.js";

const instance = new SlashCommandBuilder()

instance.setName('perguntar')
    .setDescription('Faça perguntas sobre códigos em JavaScript, conehcimentos gerais.')

const execute = async (interaction) => {
    await interaction.reply('Pong!')
}

const dataPings = {
    name: 'Perguntas',
    description: 'Faça perguntas sobre códigos em JavaScript, conehcimentos gerais.',
    execute: async (interaction) => {
        await interaction.reply('Pong!');
    }
}

// export default dataPings