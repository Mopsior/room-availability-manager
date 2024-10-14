import app from "@/lib/firebase"
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth"

export const createAccount = async ( email: string, password: string) => {
    const auth = getAuth(app)
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        return user
    } catch (error) {
        throw error
    }
}

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