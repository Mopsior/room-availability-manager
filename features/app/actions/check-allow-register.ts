'use server'

import { db } from "@/utils/firebase/firebaseServer"

export const checkAllowRegister = async () => {
    const data = await db.collection('config').doc('settings').get()

    return data.data()?.allowRegister
}