import { Client, Events } from "discord.js";
import consola from "consola";

import { type ClientEvent } from "../../types/event.js";
import { refreshSlashCommands } from "../refresh.js";

export default {
  name: Events.ClientReady,
  once: true,
  execute: (client: Client<boolean>) => {
    const upMessage = `Ready! Logged in as ${client.user?.tag}`

    if (process.env.REFRESH_COMMANDS === 'true') {
      refreshSlashCommands()
        .then(() => consola.info(upMessage))
    } else {
      consola.info(upMessage)
    }
  }
} satisfies ClientEvent