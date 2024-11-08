'use client'

import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ListUsersResult, UserRecord } from "firebase-admin/auth";
import styles from '@/styles/app/admin/settings/settings.module.css'
import { getAllUsers } from "@/features/app/admin/settings/actions/getAllUsers";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/utils/firebase/firebase";
import { useTranslations } from "next-intl";
import { Loading } from "@/components/loading";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/features/app/admin/settings/actions/delete-user";
import { changeAdminStatus } from "@/features/app/admin/settings/actions/change-admin-status";
import { RotateCcw } from "lucide-react";
import { UserRow } from "@/features/app/admin/settings/components/user-row";
import { catchError } from "@/utils/catch-error";

export default function AdminSettingsUsersPage() {
    const [ usersList, setUsersList ] = useState<ListUsersResult | null>(null)
    const [ adminsList, setAdminsList ] = useState<string[] | null>(null)
    const [ loading, setLoading ] = useState(true)
    const [ reloading, setReloading ] = useState(false)

    const t = useTranslations('AdminSettingsPage.users')
    const {toast} = useToast()

    const callUsers = async () => {
        setLoading(true)
        const [error, users] = await catchError(getAllUsers())
        if (error) {
            console.error(error)
            toast({
                title: t('error.callUsers.title'),
                description: t('error.callUsers.description'),
                variant: "destructive"
            })
            setLoading(false)
            return
        }
        setUsersList(users)
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        callUsers()

        const unsub = onSnapshot(doc(db, "config", "roles"), (doc) => {
            setAdminsList(doc.data()?.admin)
        })
        setLoading(false)

        return () => {console.log('unsubscribed'); unsub()}
    }, [])

    const reload = async () => {
        setReloading(true)
        await callUsers()
        setReloading(false)
    }

    const handleDelete = async (id: string) => {
        const [error] = await catchError(deleteUser(id))
        if (error) {
            console.error(error)
            toast({
                title: t('error.delete.title'),
                description: t('error.delete.description'),
                variant: "destructive"
            })
            return
        }

        if (adminsList?.includes(id)) {
            await changeAdminStatus(id, adminsList, true)
        }
        await callUsers()
        toast({
            title: t('success.delete.title'),
            description: t('success.delete.description'),
        })
    }

    return (
        <div className={styles.container}>
            <div className="text-center">
                <Button variant="secondary" onClick={() => reload()} disabled={reloading}>
                    {!reloading
                    ?   <>{t('reload')}<RotateCcw /></>
                    :    <Loading />
                    }
                </Button>
            </div>
            { !loading ? (
            <Table className="mt-2">
                <TableHeader>
                    <TableRow>
                        <TableHead>{t('table.email')}</TableHead>
                        <TableHead>{t('table.uid')}</TableHead>
                        <TableHead>{t('table.creationTime')}</TableHead>
                        <TableHead>{t('table.lastSignInTime')}</TableHead>
                        <TableHead>{t('table.isAdmin')}</TableHead>
                        <TableHead>{t('table.delete')}</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {usersList?.users.map((user: UserRecord) => (
                        <UserRow key={user.uid} user={user} adminsList={adminsList} onDelete={handleDelete} />
                    ))}
                </TableBody>
            </Table>
            )
            : <Loading />}
        </div>
    )
}