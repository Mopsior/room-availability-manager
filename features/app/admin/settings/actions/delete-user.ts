'use server'

import { getAuth } from "firebase-admin/auth"

export const deleteUser = async (id: string) => {
    try {
        await getAuth()
            .deleteUser(id)
        return { success: true, error: null }
    } catch (err) {
        console.error(err)
        return { success: false, error: JSON.parse(JSON.stringify(err)) }
    }
}