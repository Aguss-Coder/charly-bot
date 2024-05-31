import { type Collection } from "discord.js"
import { type Command } from "../types/command.ts"

declare module "discord.js" {
  interface Client {
    commands: Collection<string, Command>
  }
}