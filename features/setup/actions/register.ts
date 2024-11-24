'use server'

import { catchError } from "@/utils/catch-error"
import { db } from "@/utils/firebase/firebaseServer"
import { getAuth } from "firebase-admin/auth"

export const AdminAccountRegister = async (email: string, password: string) => {
    if (!email || !password) return [new Error('Email and password are required'), null]
    const [checkError, checkData] = await catchError(db.collection('config').doc('settings').get())
    if (checkError) return [JSON.parse(JSON.stringify(checkError)), null]
    if (checkData.data()?.appAfterSetup) return [new Error('App is already setup'), null]

    const [authError, authData] = await catchError(getAuth()
        .createUser({
            email: email,
            password: password,
            emailVerified: true
        }))
    if (authError) return [JSON.parse(JSON.stringify(authError)), null]

    const [firestoreError] = await catchError(db.collection('config').doc('roles').set({ admin: [authData.uid] }))
    if (firestoreError) return [JSON.parse(JSON.stringify(firestoreError)), null]

    return [null, JSON.parse(JSON.stringify(authData))]
}