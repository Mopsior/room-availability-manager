import { createAdminClient, getLoggedInUser } from "@/lib/server/appwrite"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ID } from "node-appwrite"

export default async function SignupPage() {
    return (
        <>
        <form action={sendEmail}>
            <input type="email" name="email" placeholder="email@email.com" />
            <button type="submit">Send Email</button>
        </form>
        <form action={login}>
            <input type="text" name="code" placeholder="code" />
            <button type="submit">Submit code</button>
        </form>
        </>
    )
}

const sendEmail = async (formData: FormData) => {
    'use server'
    const email = formData.get('email') as string

    const { account } = await createAdminClient()

    const sessionToken = await account.createEmailToken(
        ID.unique(),
        email
    )

    cookies().set('user-id', sessionToken.userId, {
        path: '/',
    })
}

const login = async (formData: FormData) => {
    'use server'
    const code = formData.get('code') as string

    const { account } = await createAdminClient()

    const userID = cookies().get('user-id')?.value

    const session = await account.createSession(
        userID as string,
        code
    )
    console.log(session, session.secret)

    cookies().set('user-session', session.secret, {
        path: '/',
        sameSite: 'lax',
    })
    cookies().delete('user-id')

    redirect('/rooms')
}