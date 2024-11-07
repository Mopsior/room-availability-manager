'use client'

import { db } from "@/utils/firebase/firebase"
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"

/**
 * 
 * @param {string} id - User ID
 * @param {string[] | null} adminsList - List of admin IDs
 * @param {boolean} forceRemove - if true, force removes user from the admin list
 * @returns { success: boolean, error: any }
 */
export const changeAdminStatus = async (id: string, adminsList: string[] | null, forceRemove?: boolean) => {
    try {
        await updateDoc(doc(db, 'config', 'roles'), {
            admin: ((forceRemove && arrayRemove(id)) || (adminsList?.includes(id) ? arrayRemove(id) : arrayUnion(id)))
        })
        return { success: true }
    } catch (err) {
        console.error(err)
        return { success: false, error: err }
    }
}