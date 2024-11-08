'use server'

import { catchError } from "@/utils/catch-error"
import { getAuth } from "firebase-admin/auth"

export const deleteUser = async (id: string) => {
    const [error] = await catchError(getAuth()
        .deleteUser(id))

    if (error) {
        console.error(error)
        throw error
    }
}