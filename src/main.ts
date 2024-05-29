import { Client, Collection, GatewayIntentBits } from 'discord.js';

import { type Command } from '../types/command.js';
import { getCommands } from './lib/commands.js';
import { token } from './constants.js';

async function start() {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  client.commands = new Collection<string, Command>()
  
  const commands = await getCommands()
  commands.forEach((command) => client.commands.set(command.data.name, command))

  // TODO: Solve dynamic registering of ClientEvents
  const clientReady = await import('./events/ready.js').then((module) => module.default)
  const interactionCreate = await import('./events/interaction_create.js').then((module) => module.default)
  
  client.once(clientReady.name, (...args) => clientReady.execute(...args))
  client.on(interactionCreate.name, (...args) => interactionCreate.execute(...args))

  client.login(token);
}

start()
