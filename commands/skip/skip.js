const { SlashCommandBuilder } = require('discord.js');
const { useQueue } = require('discord-player');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Skips the current track.'),
    async execute(interaction) {
        // interaction.user is the object representing the User who ran the command
        // interaction.member is the GuildMember object, which represents the user in the specific guild
        await interaction.deferReply();
        const queue = useQueue(interaction.guild.id);
        try {
            if (!interaction.member.voice.channel) {
                return interaction.editReply("You aren't in a voice channel!");
            }
            if (!queue) {
                return interaction.editReply("There's nothing to skip!")
            }
            if (queue.channel != interaction.member.voice.channel) {
                return interaction.editReply(`You aren't in this channel.`);
            }

            const currentTrack = queue.currentTrack; //Gets the current track being played

            queue.node.skip();
            await interaction.editReply(`Skipped **${currentTrack.title}**`);
        } catch (e) {
            return interaction.editReply(`Something went wrong: ${e}`)
        }
    },
};