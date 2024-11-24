'use server'

import { catchError } from "@/utils/catch-error";
import app from "@/utils/firebase/firebase";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const checkVariables = async () => {
    const requiredVars = [
        'NEXT_PUBLIC_FIREBASE_API_KEY',
        'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
        'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
        'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
        'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
        'NEXT_PUBLIC_FIREBASE_APP_ID',
        'NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID',
        'FIREBASE_TYPE',
        'FIREBASE_PROJECT_ID',
        'FIREBASE_PRIVATE_KEY',
        'FIREBASE_CLIENT_EMAIL'
    ];

    const unsetVars = requiredVars.filter((varName) => !process.env[varName]);

    if (unsetVars.length > 0) {
        throw new Error(`The following environment variables are not set: ${unsetVars.join(', ')}`);
    }

    return [null, true]
}

const checkFirebaseConnection = async () => {
    const [authError] = await catchError(Promise.resolve(getAuth(app).app))
    if (authError) throw new Error(`Firebase connection failed (in auth segment): ${authError.message}`)
    const [firestoreError] = await catchError(Promise.resolve(getFirestore(app)))
    if (firestoreError) throw new Error(`Firebase connection failed (in firestore segment): ${firestoreError.message}`)

    return [null, true]
}

export const checkFirebase = async () => {
    await checkVariables()
    await checkFirebaseConnection()
    return true
}
