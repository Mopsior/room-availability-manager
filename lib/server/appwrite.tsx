"use server"

import { cookies } from "next/headers"
import { Account, Client } from "node-appwrite"

export const createSessionClient = async () => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string)
    const session = cookies().get('user-session')

    if (!session || !session.value) {
        throw new Error('No session found')
    }

    client.setSession(session.value)
    return {
        get account() {
            return new Account(client)
        }
    }
}

export const createAdminClient = async () => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string)
        .setKey(process.env.APPWRITE_KEY as string)

    return {
        get account() {
            return new Account(client)
        }
    }
}

export const getLoggedInUser = async () => {
    try {
        const { account } = await createSessionClient()
        return await account.get()
    } catch (err) {
        return null
    }
}