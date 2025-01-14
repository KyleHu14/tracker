import { config } from "dotenv"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

config({ path: ".env.local" }) // or .env.local

const client = postgres(process.env.CONNECTION_STRING!, { prepare: false })
export const db = drizzle({ client })
