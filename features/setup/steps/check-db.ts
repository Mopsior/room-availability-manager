import { catchError } from "@/utils/catch-error"
import { db } from "@/utils/firebase/firebaseServer"

const checkConfig = async () => {
    const rolesDoc = await db.collection('config').doc('roles').get()
    if (!rolesDoc.exists) {
        const [error] = await catchError(db.collection('config').doc('roles').set({
            admin: []
        }))
        if (error) throw new Error('DB: config/roles canno\'t be created')
    }

    const settingsDoc = await db.collection('config').doc('settings').get()
    if (!settingsDoc.exists) {
        const [error] = await catchError(db.collection('config').doc('settings').set({
            allowRegister: true,
            disableLandingPage: false
        }))
        if (error) throw new Error('DB: config/settings canno\'t be created')
    }

    const roomsCollection = await db.collection('rooms').get()
    if (roomsCollection.empty) {
        const [error] = await catchError(db.collection('rooms').add({
            name: 'General',
            description: 'General room',
            last_edit: new Date(),
            full: false
        }))
        if (error) throw new Error('DB: rooms canno\'t be created')
    }
}

export const checkDB = async () => {
    await checkConfig()
    return true
}