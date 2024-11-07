'use client'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import app from "./firebase"
import { catchError } from "../catch-error"

export const logIn = async (email: string, password: string) => {
    const auth = getAuth(app)
    
    const [error, userCredential] = await catchError(signInWithEmailAndPassword(auth, email, password))
    if (error) throw error
    
    const user = userCredential.user
    return user
}