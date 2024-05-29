import { Client, GatewayIntentBits } from 'discord.js';
import { consola } from "consola"

import { refreshSlashCommands } from './refresh.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on('ready', async () => {
  if (process.env.REFRESH_COMMANDS === 'true') {
    refreshSlashCommands()
      .then(() => {
        consola.info(`Logged in as ${client.user?.tag}!`);
      })
  } else {
    consola.info(`Logged in as ${client.user?.tag}!`);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  consola.log(`${interaction.user.tag} (GUILD: ${interaction.guildId}) issued ${interaction.commandName}`);

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

client.login(process.env.TOKEN!);