import { ButtonBuilder } from "@discordjs/builders";
import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonStyle } from "discord.js";
import version from "../../version.js";

const dataSobre = {
    data: new SlashCommandBuilder()
        .setName('sobre')
        .setDescription('Informações sobre o bot.'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('4DevsBot')
            .setColor(0xd54720)
            .setDescription("Um bot para ajudar no dia-a-dia dos estudantes de programação da UFRA")
            .addFields({ name: '\n', value: '\n' })
            .addFields(
                { name: 'Criador', value: '<@476079290585448498>', inline: true },
                { name: 'Versão', value: version, inline: true },
                { name: 'Comandos', value: "9", inline: true },
            )
            .setImage("https://i.imgur.com/lSAJCCy.png")
            .setThumbnail("https://i.imgur.com/2fBdPTC.png")
            .setURL('https://github.com/JoaoVitorJJV/disocrd-4devs-bot')

        const button = new ActionRowBuilder()
            .addComponents(new ButtonBuilder()
                .setCustomId("cmd_btn")
                .setLabel("Comandos")
                .setStyle(ButtonStyle.Primary)
            )
        await interaction.reply({ embeds: [embed], components: [button] });
    }
}


export default dataSobre