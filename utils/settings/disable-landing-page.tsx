'use server'

import { doc, getDoc } from "firebase/firestore"
import { ReactNode } from "react"
import { db } from "../firebase/firebase"
import { redirect } from "next/navigation"

export const HandleLAndingPageSettings = async ({ children }: { children: ReactNode }) => {
    const data = await getDoc(doc(db, 'config', 'settings')) 

    if (data.data()?.disableLandingPage) return redirect('/login')

    return (
        <>
           {children}
        </>
    )
}