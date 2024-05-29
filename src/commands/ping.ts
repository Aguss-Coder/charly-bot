import { type CacheType, type ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js"

const data = new SlashCommandBuilder()
  .setName('pingo')
  .setDescription('Replies with Poronga!');

const execute = async (interaction: ChatInputCommandInteraction<CacheType>) => {
  await interaction.reply('pong')
}

export default { data, execute }