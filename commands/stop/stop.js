const { useQueue, useMainPlayer } = require('discord-player');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription("Stops the bot's current playback, and clears the queue."),
    async execute(interaction) {
        await interaction.deferReply();
        const queue = useQueue(interaction.member.guild);
        if (!queue) {
            return interaction.editReply("There's nothing to stop?")
        }
        queue.clear();
        queue.node.skip();
        await interaction.editReply("Done. 👺")
    },
};