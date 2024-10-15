'use client'

import { doc, updateDoc } from 'firebase/firestore'
import styles from './Block.module.css'
import { db } from '@/lib/firebase'
import { useAuthContext } from '@/utils/firebase/AuthContext'

/**
 * Room block component
 * @param name Room name (ex. room number: 101)
 * @param description Room description (ex. Meeting room)
 * @param full Is room occupied
 * @param id Room document ID
 */
export const Block = ({ name, description, full, id }: { name: string, description: string, full: boolean, id: string }) => {
    const user = useAuthContext()
    const handleClick = async () => {
        console.log('clicked')
        console.log(user)
        try {
            console.log(user)
            console.log(`i'm inside`)
            await updateDoc(doc(db, 'rooms', id), {
                full: !full,
                last_edit: new Date()
            })
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div
            className={`${styles.block} ${full ? styles.full : styles.empty}`}
            onClick={() => handleClick()} >
            <h3 className={styles.title}>{name}</h3>
            <p>{description}</p>
        </div>
    )
}