import { type CacheType, type ChatInputCommandInteraction, type SlashCommandBuilder } from "discord.js";

export interface Command {
  data: SlashCommandBuilder
  execute: (interaction: ChatInputCommandInteraction<CacheType>) => Promise<void>
}