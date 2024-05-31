import { type CacheType, type ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

const data = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Replies with Pong!');

const execute = async (interaction: ChatInputCommandInteraction<CacheType>) => {
  await interaction.reply('pong')
}

export default { data, execute }