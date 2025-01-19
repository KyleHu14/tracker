import { createAuthClient } from "better-auth/react"
export const authClient = createAuthClient({
    baseURL: "https://tracker-3g4y.vercel.app", // the base url of your auth server
})

export const { signIn, signOut, useSession } = authClient
