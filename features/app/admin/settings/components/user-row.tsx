'use client'

import { Switch } from "@/components/ui/switch"
import { TableCell, TableRow } from "@/components/ui/table"
import { db } from "@/utils/firebase/firebase"
import { UserRecord } from "firebase-admin/auth"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"
import { useEffect, useState } from "react"

export const UserRow = ({ user, adminsList }: { user: UserRecord, adminsList: Array<string> | null }) => {
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        if (adminsList?.includes(user.uid)) setIsAdmin(true)
    }, [adminsList])

    const onChange = async () => {
        await updateDoc(doc(db, 'config', 'roles'), {
            admin: isAdmin ? arrayRemove(user.uid) : arrayUnion(user.uid)
        })
    }

    return (
        <TableRow key={user.uid}>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.uid}</TableCell>
            <TableCell>{user.metadata.creationTime}</TableCell>
            <TableCell>{user.metadata.lastSignInTime}</TableCell>
            <TableCell><Switch checked={isAdmin} onCheckedChange={() => onChange()} /></TableCell>
        </TableRow>
    )
}