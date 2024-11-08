'use server'
import app from "@/utils/firebase/firebase"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { catchError } from "../catch-error"

export const createAccount = async ( email: string, password: string) => {
    const auth = getAuth(app)
    const [error, userCredential] = await catchError(createUserWithEmailAndPassword(auth, email, password))
    if (error) throw error

    const user = userCredential.user
    return JSON.parse(JSON.stringify(user))
}