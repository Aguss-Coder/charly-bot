import { CacheType, Events, Interaction } from "discord.js";
import { ClientEvent } from "../../types/event.js";
import consola from "consola";

export default {
  name: Events.InteractionCreate,
  execute: async (interaction: Interaction<CacheType>) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName)

    if (!command) {
      consola.error(`No command ${interaction.commandName} was found.`)

      return
    }

    try {
      await command.execute(interaction)
    } catch (error) {
      consola.error(error)

      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({ content: "There was an error while executing this command", ephemeral: true })
      } else {
        await interaction.reply({ content: "There was an error while executing this command", ephemeral: true })
      }
    }
  }
} satisfies ClientEvent