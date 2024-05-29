import { REST, type RESTPostAPIApplicationCommandsJSONBody, Routes } from "discord.js"
import { consola } from "consola"; 
import { clientId, token } from "./constants.js";
import { getCommands } from "./lib/commands.js"

type CommandData = RESTPostAPIApplicationCommandsJSONBody

/**
 * Refreshes the slash commands for the bot.
*/
export async function refreshSlashCommands() {
  const rest = new REST({ version: '10' }).setToken(token);
  const commands = await getCommands();
  const commandsData: CommandData[] = commands.map((command) => command.data.toJSON())
  
  try {
    consola.start('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands(clientId), { body: commandsData });
  
    consola.success('Successfully reloaded application (/) commands.');
  } catch (error) {
    consola.error(error);
  }
}
