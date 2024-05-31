import { setTimeout } from "node:timers/promises"

function isVariableDefined (variable?: string): variable is string {
  return typeof variable !== 'undefined' && variable.length > 0
}

export function getEnvironmentVariable(name: string): string {
  const variable = process.env[name]

  if (!isVariableDefined(variable)) {
    throw new Error(`Environment variable: "${name}" is not defined.`)
  }

  return variable
}

/**
 * Wait a desired time before the next execution step.
 * @param time The time to wait, in seconds
 */
export async function wait(time: number) {
  setTimeout(time * 1000)
}