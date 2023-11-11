const { useQueue, useMainPlayer } = require('discord-player');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription("Clears the queue."),
    async execute(interaction) {
        await interaction.deferReply();
        const queue = useQueue(interaction.member.guild);
        if (!queue) {
            return interaction.editReply("There's nothing to clear...")
        }
        queue.clear();
        await interaction.editReply("Done. 👺")
    },
};