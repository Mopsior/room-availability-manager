'use server'

import { auth }from "@/utils/firebase/firebaseServer"
import { ListUsersResult } from "firebase-admin/auth"

export const getAllUsers = async () => {
    const usersList: ListUsersResult = await auth
        .listUsers(1000)

    const data = JSON.parse(JSON.stringify(usersList))

    return data
}