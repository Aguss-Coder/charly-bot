import { REST, type RESTPostAPIApplicationCommandsJSONBody, Routes, SlashCommandBuilder } from "discord.js"
import { consola } from "consola"; 
import fs from "fs"
import path from "path";

import { __dirname } from "./constants.js";

interface Command {
  data: SlashCommandBuilder
  execute: () => Promise<void>
}

type CommandData = RESTPostAPIApplicationCommandsJSONBody

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isCommand (command: any): command is Command {
  return Object.hasOwn(command, 'data') && Object.hasOwn(command, 'execute');
}

/**
 * Parses all the commands in the `/commands` folder and returns them.
 * @returns an array of commands
 */
async function getCommandsData(): Promise<CommandData[]> {
  const commands: CommandData[] = [];

  const foldersPath = path.join(__dirname, 'commands');
  const commandFiles = fs.readdirSync(foldersPath).filter(file => file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(foldersPath, file);
    const command = await import(filePath) as Command

    if (isCommand(command)) {
      commands.push(command.data.toJSON())
    } else {
      throw new Error(`The command at ${filePath} is missing required properties.`)
    }
  }
  
  return commands
}
/**
 * Refreshes the slash commands for the bot.
*/
export async function refreshSlashCommands() {
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN!);
  const commands = await getCommandsData();
  
  try {
    consola.start('Started refreshing application (/) commands.');
  
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID! ), { body: commands });
  
    consola.success('Successfully reloaded application (/) commands.');
  } catch (error) {
    consola.error(error);
  }
}
