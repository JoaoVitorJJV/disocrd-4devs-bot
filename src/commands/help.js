import { SlashCommandBuilder, EmbedBuilder } from "discord.js";

const dataHelp = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Exibe a lista de comandos disponíveis.'),
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Comandos Disponíveis')
            .setColor('#00ff00')
            .addFields({ name: '\n\n', value: '\n\n' })
            .setAuthor({
                name: '4DevsBot',
                iconURL: 'https://i.imgur.com/lSAJCCy.png',
            })
            .setDescription('Aqui estão os comandos disponíveis:')
            .setThumbnail('https://i.imgur.com/2fBdPTC.png')
            .addFields(
                { name: '/help', value: 'Exibe a lista de comandos disponíveis.' },
                { name: '\n', value: '\n' },
                { name: '/ping', value: 'Testa se o bot está funcionando.' },
                { name: '\n', value: '\n' },
                { name: '/commits', value: 'Exibe os últimos 25 commits do repositório.' },
                { name: '\n', value: '\n' },
                { name: '/js', value: 'Faça qualquer pergunta sobre JavaScript.' },
                { name: '\n', value: '\n' },
                { name: '/perguntar', value: 'Pergunte qualquer coisa para o Bot, ele irá responder (beta)' },
                { name: '\n', value: '\n' },
                { name: '/hex-cor', value: 'Exibe cores em hexadecimal ou traduz o nome de cores. Para exibir em hexadecimal, você pode escrever: background-color: #.' },
                { name: '\n', value: '\n' },
                { name: '/sql', value: 'Faça perguntas sobre SQL, como raw queries, criação de tabelas e muito mais.' },
                { name: '\n', value: '\n' },
                { name: '/adc_colaborador', value: 'Adiciona um colaborador ao repositório'},
                { name: '\n', value: '\n' },
                { name: '/rem_colaborador', value: 'Remove um colaborador de um repositório'},
                { name: '\n', value: '\n' },
            )
            .setFooter({ text: 'Bot criado por João Vitor', iconURL: 'https://avatars.githubusercontent.com/u/77819780?v=4' });
        await interaction.reply({ embeds: [embed] });
    }
}


export default dataHelp