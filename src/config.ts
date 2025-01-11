if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    throw new Error(
        "ENV ERROR : Supabase URL is null, check if the .env file is initialized correctly.",
    )
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    throw new Error(
        "ENV ERROR : Supabase ANON Key is null, check if the .env file is initialized correctly.",
    )
}

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
