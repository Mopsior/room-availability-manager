'use client'

import app from "@/lib/firebase"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { useState } from "react"

export default function Home() {
    const auth = getAuth(app)
    const [user, setUser] = useState<User | null>(null)
    onAuthStateChanged(auth, (user) => {
        setUser(user)
    })
    
    console.log(user)

    return (
        <>
            It works!
        </>
    )
}
