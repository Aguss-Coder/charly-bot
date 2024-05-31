import path from "path"
import { fileURLToPath } from "url"
import { getEnvironmentVariable } from "./lib/utils.js"

// There's a problem with __dirname being undefined after bundling step,
// so we override it to a constant to use it properly.
export const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

export const clientId = getEnvironmentVariable("CLIENT_ID")
export const token = getEnvironmentVariable("TOKEN")