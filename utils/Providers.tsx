'use client'

import { AuthContextProvider } from "./firebase/AuthContext"
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
    return (
        <AuthContextProvider>
            { children }
        </AuthContextProvider>
    )
}