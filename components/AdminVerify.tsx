'use client'

import { db } from "@/lib/firebase"
import { useAuthContext } from "@/utils/firebase/AuthContext"
import { doc, getDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"

export const AdminVerify = ({ children }: { children: ReactNode}) => {
    const [loading, setLoading] = useState<boolean>(true)
    const router = useRouter()
    const user = useAuthContext()

    const checkAdmin = async () => {
        const docSnap = await getDoc(doc(db, 'config', 'roles'))
        if (!docSnap.exists()) {
            return console.error('Config document does not exist')
        }

        if (docSnap.data().admin.includes(user?.uid)) {
            setLoading(false)
        } else {
            router.push('/')
            setLoading(true)
        }
    }

    useEffect(() => {
        if (user) {
            checkAdmin()
        }
    }, [user])

    return (
        <>
            {loading ? <h1>Loading</h1> : children}
        </>
    )
}