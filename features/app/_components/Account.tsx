'use client'

import { useAuthContext } from "@fb/AuthContext"
import { Button } from "@shadcn/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@shadcn/dropdown-menu"
import { Avatar, AvatarFallback } from "@shadcn/avatar"
import { getAuth, signOut } from "firebase/auth"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { HTMLAttributes } from "react"

const auth = getAuth()
export const Account = () =>{
    const user = useAuthContext()
    const { toast } = useToast()
    const router = useRouter()

    const logOut = async () => {
        console.log('klik')
        try {
            await signOut(auth)
            toast({
                title: 'Wylogowano pomyślnie',
            })
            router.push('/login')

        } catch (error) {
            toast({
                title: 'Błąd podczas wylogowywania',
                variant: 'destructive'
            })
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={'outline'}>
                    <Avatar className="py-1 px-1" >
                        <AvatarFallback>
                            {user?.email?.slice(0, 2) || 'Aa'}
                        </AvatarFallback>
                    </Avatar>
                    {user?.email}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logOut()} className="cursor-pointer">
                    Wyloguj się
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}