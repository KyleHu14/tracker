import { createAuthClient } from "better-auth/react"

if (process.env.NEXT_PUBLIC_BASE_URL) {
    throw Error("BASE URL DOES NOT EXIST")
}

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000", // the base url of your auth server
})

export const { signIn, signOut, useSession } = authClient
