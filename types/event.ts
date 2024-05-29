import { CacheType, Client, ClientEvents, Interaction } from "discord.js";

export type ClientEvent = ClientEventOnce | ClientEventOnInteraction;

export interface ClientEventOnce {
  name: keyof ClientEvents // TODO: Check for more "once" events.
  once: true
  execute: (client: Client<boolean>) => void
}

export interface ClientEventOnInteraction {
  name: keyof ClientEvents
  execute: (interaction: Interaction<CacheType>) => Promise<void>
}