const { SlashCommandBuilder, InteractionResponse } = require('discord.js');
const { useMainPlayer, QueryType, useQueue } = require('discord-player');


function isValidHttpUrl(string) {
	let url;

	try {
		url = new URL(string);
	} catch (_) {
		return false;
	}

	return true;
}


module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play a song from YouTube')
		.addStringOption(option =>
			option
				.setName('song')
				.setDescription('The name/url for the song')
				.setRequired(true)),
	async execute(interaction) {
		const player = useMainPlayer();
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		const argument = interaction.options.getString('song');
		await interaction.deferReply()
		const userChannel = interaction.member.voice.channel;
		if (!userChannel) {
			return interaction.editReply("You are not in a voice channel!");
		}
		const queue = useQueue();
		if (queue) {
			if (queue.channel != userChannel) {
				return interaction.editReply("You aren't in this channel!");
			}
		}
		let vidUrl = argument;
		// if (!validateYouTubeUrl(argument)) {
		// 	await interaction.editReply(`Searching for **${argument}**...`);
		// 	res = await search(argument, { limit: 1 });
		// 	vidUrl = res.items[0].url;
		// }

		try {
			const uSeed = Math.random();
			if (uSeed < 0.1) {
				vidUrl = "https://www.youtube.com/watch?v=xqS2di2QdhQ";
				await interaction.followUp("Something went wrong: AAAAAAAAAAHHHHHHHHHHHHHHHH 🗣️🗣️🗣️🗣️🗣️🗣️🔥🔥🔥🔥🔥❗❗❗❗❗❗");
			}

			const { track } = await player.play(userChannel, vidUrl, {
				nodeOptions: {
					// nodeOptions are the options for guild node (aka your queue in simple word)
					metadata: interaction // we can access this metadata object using queue.metadata later on
				},
				searchEngine: (!isValidHttpUrl(vidUrl) ? QueryType.YOUTUBE_SEARCH : undefined)
			});
			return interaction.followUp(`Added to queue: **${track.title}**.\n${track.url}`);



		} catch (e) {
			// let's return error if something failed
			return interaction.followUp(`Something went wrong: ${e}`);
		}

	},
};