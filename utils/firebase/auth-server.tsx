'use server'
import app from "@/utils/firebase/firebase"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth"

export const createAccount = async ( email: string, password: string) => {
    const auth = getAuth(app)
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        return JSON.parse(JSON.stringify(user))
    } catch (error) {
        throw error
    }
}