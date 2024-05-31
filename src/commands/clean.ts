import {
  type ChatInputCommandInteraction,
  type DiscordAPIError,
  SlashCommandBuilder,
  TextChannel,
  PermissionFlagsBits,
} from "discord.js"
import consola from "consola"

const data = new SlashCommandBuilder()
  .setName("clean")
  .setDescription("Cleans up a channel")
  .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
  .addNumberOption(input =>
    input
      .setName('quantity')
      .setDescription('Quantity of messages to delete, starting from here.')
      .setMinValue(0)
      .setMaxValue(100)
      .setRequired(true)
  )

const execute = async (interaction: ChatInputCommandInteraction) => {
  const channel = interaction.channel

  if (!channel || !(channel instanceof TextChannel)) {
    await interaction.reply({ content: "I couldn't find the channel to clean.", ephemeral: true })
    
    return;
  }

  const quantity = interaction.options.getNumber('quantity', true)

  try {
    const result = await channel.bulkDelete(quantity)

    await interaction.reply({ content: `Successfully deleted ${result.size} messages!`, ephemeral: true })
  } catch (error) {
    consola.error(error)

    await interaction.reply({ content: (error as DiscordAPIError).message, ephemeral: true })
  }

}

export default { data, execute }