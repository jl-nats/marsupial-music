const { useQueue, useMainPlayer } = require('discord-player');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove')
        .setDescription("Removes a track from the queue.")
        .addNumberOption(option =>
            option.setName('number')
                .setDescription('The number of the track to be removed. (Check using /queue)')
                .setRequired(true)),
    async execute(interaction) {
        const trackNumber = interaction.options.getNumber('number');
        await interaction.deferReply();
        const queue = useQueue(interaction.member.guild);
        if (!queue) {
            return interaction.editReply("There's nothing to remove...");
        }
        queueTracks = queue.tracks.toArray();
        if (trackNumber > queueTracks.length || trackNumber < 0) {
            return interaction.editReply("Nah that just ain't gonna work.")
        }
        try {
            queue.node.remove(queueTracks[trackNumber - 1]);
        } catch (e) {
            await interaction.editReply("You did something wrong 😔")
        }

        await interaction.editReply("Done. 👺")
    },
};