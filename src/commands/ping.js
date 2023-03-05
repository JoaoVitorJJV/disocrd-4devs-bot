import { SlashCommandBuilder } from "discord.js";

const dataPings = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Verifica se o BOT está online -> pong'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    }
}

export default dataPings