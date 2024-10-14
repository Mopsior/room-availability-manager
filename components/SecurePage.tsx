'use client'
import { useAuthContext } from "@/utils/firebase/AuthContext"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"

export const SecurePage = ({ loginPage }: { loginPage?: boolean }) => {
    const user = useAuthContext()
    console.log(user)
    const router = useRouter()
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        console.log(user)
        if (loginPage && user) return router.push('/app')
        if (loginPage) return setLoading(false)
        if (!user) {
            return router.push('/login')
        } else return setLoading(false)
    }, [user])

    if (loading) return <h1>Loading...</h1>
}

export const SecureLayout = ({ children, loginPage = false }: { children: ReactNode, loginPage?: boolean }) => {
    return (
        <>
            <SecurePage loginPage={loginPage}/>
            {children}
        </>
    )
}