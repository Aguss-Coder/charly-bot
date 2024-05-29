import fs from "fs";
import path from "path";
import { __dirname } from "../constants.js";
import { Command } from "../../types/command.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isCommand (command: any): command is Command {
  return Object.hasOwn(command, 'data') && Object.hasOwn(command, 'execute');
}

/**
 * Retrieves all commands from the `/commands` folder
 * @returns an array of `Command`
 */
export async function getCommands(): Promise<Command[]> {
  const commands: Command[] = []
  const commandsPath = path.join(__dirname, 'commands')
  const commandsFiles = fs.readdirSync(commandsPath).filter((file) => file.endsWith('.js'))

  for (const file of commandsFiles) {
    const filePath = path.join(commandsPath, file)
    const command = await import(filePath).then((module) => module.default)

    if (isCommand(command)) {
      commands.push(command)
    } else {
      throw new Error(`The command at ${filePath} is missing required properties.`)
    }
  }
  
  return commands;
}