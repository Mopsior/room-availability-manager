'use client'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import app from "./firebase"

export const logIn = async (email: string, password: string) => {
    const auth = getAuth(app)
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        return user
    } catch (error) {
        throw error
    }
}