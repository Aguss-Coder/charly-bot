/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from "fs"
import path from "path";
import { __dirname } from "../constants.js";
import { ClientEvent } from "../../types/event.js";

function isEvent (event: any): event is ClientEvent {
  return 'name' in event && 'execute' in event
}

/**
 * Retrieves the valid `ClientEvent` instances
 * @returns an array of `ClientEvent`
 */
export async function getEvents(): Promise<ClientEvent[]> {
  const events: ClientEvent[] = []
  const eventsPath = path.join(__dirname, 'events')
  const eventsFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'))

  for (const file of eventsFiles) {
    const filePath = path.join(eventsPath, file)
    const event = await import(filePath).then((module) => module.default)

    if (!isEvent(event)) {
      throw new Error(`The event at ${filePath} is missing required properties.`)
    }

    events.push(event)
  }

  return events
}