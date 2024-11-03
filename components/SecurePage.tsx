'use client'
import { useAuthContext } from "@/utils/firebase/AuthContext"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"
import { Loading } from "./loading"

export const SecurePage = ({ loginPage, children }: { loginPage?: boolean, children: ReactNode }) => {
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

    if (loading) return <Loading />
    else return <>{children}</>
}

export const SecureLayout = ({ children, loginPage = false }: { children: ReactNode, loginPage?: boolean }) => {
    return (
        <>
            <SecurePage loginPage={loginPage}>
                {children}
            </SecurePage>
        </>
    )
}