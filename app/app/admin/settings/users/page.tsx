'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ListUsersResult, UserRecord } from "firebase-admin/auth";
import styles from '@/styles/app/admin/settings/settings.module.css'
import { getAllUsers } from "@/features/app/admin/settings/actions/getAllUsers";
import { useEffect, useState } from "react";
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "@/utils/firebase/firebase";
import { Switch } from "@/components/ui/switch";
import { useTranslations } from "next-intl";
import { Loading } from "@/components/loading";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/features/app/admin/settings/actions/delete-user";
import { changeAdminStatus } from "@/features/app/admin/settings/actions/change-admin-status";

export default function AdminSettingsUsersPage() {
    const [ usersList, setUsersList ] = useState<ListUsersResult | null>(null)
    const [ adminsList, setAdminsList ] = useState<string[] | null>(null)
    const [ loading, setLoading ] = useState(true)

    const t = useTranslations('AdminSettingsPage.users')
    const {toast} = useToast()

    const callUsers = async () => {
        setLoading(true)
        const users = await getAllUsers()
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

    const onChange = async (id: string) => {
        const {error} = await changeAdminStatus(id, adminsList)
        if (error) {
            console.error(error)
            toast({
                title: t('error.status.title'),
                description: t('error.status.description'),
                variant: "destructive"
            })
        }

        toast({
            title: t('success.status.title'),
            description: t('success.status.description'),
        })
    }

    const handleDelete = async (id: string) => {
        const { error} = await deleteUser(id)
        if (error) return (
            toast({
                title: t('error.delete.title'),
                description: t('error.delete.description'),
                variant: "destructive"
            })
        )

        if (adminsList?.includes(id)) {
            await changeAdminStatus(id, adminsList, true)
        }
        callUsers()
        toast({
            title: t('success.delete.title'),
            description: t('success.delete.description'),
        })
    }

    if (loading) return <Loading />

    return (
        <div className={styles.container}>
            <Table>
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
                    {/* TODO: move to separate component */}
                    {/* only button need callUsers(), so make it as a prop onClick and
                        add it in component (as onClick={() => onClick}) or smth */}
                    {usersList?.users.map((user: UserRecord) => (
                        <TableRow key={user.uid}>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.uid}</TableCell>
                            <TableCell>{user.metadata.creationTime}</TableCell>
                            <TableCell>{user.metadata.lastSignInTime}</TableCell>
                            <TableCell><Switch checked={adminsList?.includes(user.uid)} onCheckedChange={() => onChange(user.uid)} /></TableCell>
                            <TableCell><Button onClick={() => handleDelete(user.uid)}>Usuń</Button></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}