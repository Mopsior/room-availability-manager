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

// add loading skeleton

export default function AdminSettingsUsersPage() {
    const [ usersList, setUsersList ] = useState<ListUsersResult | null>(null)
    const [ adminsList, setAdminsList ] = useState<string[] | null>(null)
    const [ loading, setLoading ] = useState(true)

    const t = useTranslations('AdminSettingsPage.users')

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

    console.log(usersList, adminsList)

    const onChange = async ( id: string ) => {
        await updateDoc(doc(db, 'config', 'roles'), {
            admin: adminsList?.includes(id) ? arrayRemove(id) : arrayUnion(id)
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
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {usersList?.users.map((user: UserRecord) => (
                        <TableRow key={user.uid}>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.uid}</TableCell>
                            <TableCell>{user.metadata.creationTime}</TableCell>
                            <TableCell>{user.metadata.lastSignInTime}</TableCell>
                            <TableCell><Switch checked={adminsList?.includes(user.uid)} onCheckedChange={() => onChange(user.uid)} /></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}