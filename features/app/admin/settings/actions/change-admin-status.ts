'use client'

import { catchError } from "@/utils/catch-error"
import { db } from "@/utils/firebase/firebase"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"

/**
 * 
 * @param {string} id - User ID
 * @param {string[] | null} adminsList - List of admin IDs
 * @param {boolean} forceRemove - if true, force removes user from the admin list
 */
export const changeAdminStatus = async (id: string, adminsList: string[] | null, forceRemove?: boolean) => {
    const [error] = await catchError(updateDoc(doc(db, 'config', 'roles'), {
        admin: ((forceRemove && arrayRemove(id)) || (adminsList?.includes(id) ? arrayRemove(id) : arrayUnion(id)))
    }))
    
    if (error) {
        console.error(error)
        throw error
    }
}