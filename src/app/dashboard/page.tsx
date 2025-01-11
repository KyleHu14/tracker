"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"

const Dashboard = () => {
    const supabase = createClient()
    const handleSignOut = () => {
        supabase.auth.signOut()
    }
    return (
        <>
            Dashboard, Protected{" "}
            <Button onClick={handleSignOut}>Sign Out</Button>
        </>
    )
}

export default Dashboard
