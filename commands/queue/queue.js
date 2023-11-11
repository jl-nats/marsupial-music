const { useQueue } = require('discord-player');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('queue')
        .setDescription('Shows the current queue.'),
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        await interaction.deferReply();
        queue = useQueue(interaction.guild.id);
        if (!queue) {
            return interaction.editReply("Queue is empty.");
        }
        queueTracks = queue.tracks.toArray();
        if (queueTracks.length === 0) {
            return interaction.editReply("Queue is empty.");
        }
        let queueStr = "Queue: \n";
        for (let i = 0; i < queueTracks.length; i++) {
            queueStr = queueStr + `${i}. **${queueTracks[i].title}** \n`
        }
        await interaction.editReply(queueStr);
    },
};