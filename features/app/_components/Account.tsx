'use client'

import { useAuthContext } from "@fb/AuthContext"
import { Button } from "@shadcn/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@shadcn/dropdown-menu"
import { Avatar, AvatarFallback } from "@shadcn/avatar"
import { getAuth, signOut } from "firebase/auth"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { LogOut, Settings } from "lucide-react"
import { catchError } from "@/utils/catch-error"

const auth = getAuth()
export const Account = ({ haveSettings }: { haveSettings?: boolean }) =>{
    const t = useTranslations('auth')
    const uniT = useTranslations('universal')
    const user = useAuthContext()
    const { toast } = useToast()
    const router = useRouter()

    const logOut = async () => {
        const [error] = await catchError(signOut(auth))
        if (error) {
            toast({
                title: t('signout.error'),
                variant: 'destructive'
            })
            return
        }

        toast({
            title: t('signout.success'),
        })
        router.push('/login')
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
                    <LogOut />
                    {t('signout.text')}
                </DropdownMenuItem>
                { haveSettings && (
                <Link href="/app/admin/settings">
                    <DropdownMenuItem className="cursor-pointer">
                        <Settings />
                        {uniT('settings')}
                    </DropdownMenuItem>
                </Link>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}