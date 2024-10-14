'use client'

import app from "@/lib/firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";

export const AuthContext = createContext<User | undefined>(undefined)
export const useAuthContext = () => useContext(AuthContext)

const auth = getAuth(app)

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) setUser(user)
            else setUser(undefined)
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    return (
        <AuthContext.Provider value={user}>
            { loading ? <h1>Loading...</h1> : children }
        </AuthContext.Provider>
    )
}