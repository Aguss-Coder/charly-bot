import { REST, type RESTPostAPIApplicationCommandsJSONBody, Routes, RESTPostAPIApplicationCommandsResult } from "discord.js"
import { consola } from "consola"; 
import { clientId, token } from "./constants.js";
import { getCommands } from "./lib/commands.js"

type CommandData = RESTPostAPIApplicationCommandsJSONBody

/**
 * Refreshes the slash commands for the bot.
*/
export async function refreshSlashCommands() {
  const rest = new REST().setToken(token);
  const commands = await getCommands();
  const commandsData: CommandData[] = commands.map((command) => command.data.toJSON())

  try {
    consola.start(`Started refreshing ${commandsData.length} application (/) commands.`);
  
    const result = await rest.put(Routes.applicationCommands(clientId), { body: commandsData }) as RESTPostAPIApplicationCommandsResult[];

    consola.success(`Successfully reloaded ${result.length} application (/) commands.`);
  } catch (error) {
    consola.error(error);
  }
}
