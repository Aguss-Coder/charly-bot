import path from "path"
import { fileURLToPath } from "url"
import { getEnvironmentVariable } from "./lib/utils.js"

export const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)
export const clientId = getEnvironmentVariable("CLIENT_ID")
export const token = getEnvironmentVariable("TOKEN")