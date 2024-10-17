'use client'

import { doc, Timestamp, updateDoc } from 'firebase/firestore'
import styles from './Block.module.css'
import { db } from '@/lib/firebase'
import { useAuthContext } from '@/utils/firebase/AuthContext'
import { useEffect, useState } from 'react'

/**
 * Room block component
 * @param name Room name (ex. room number: 101)
 * @param description Room description (ex. Meeting room)
 * @param full Is room occupied
 * @param id Room document ID
 */
export const Block = ({ name, description, full, id, last_edit }: { name: string, description: string, full: boolean, id: string, last_edit: Timestamp }) => {
    const user = useAuthContext()
    const [elapsedTime, setElapsedTime] = useState<string>('')

    const handleClick = async () => {
        setElapsedTime('0:00')
        try {
            await updateDoc(doc(db, 'rooms', id), {
                full: !full,
                last_edit: new Date()
            })
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
       if (!full) return
       const intervalId = setInterval(() => {
            const now = new Date()
            const parsedDate = new Date(last_edit.toDate())
            const elapsedInSeconds = Math.floor((now.getTime() - parsedDate.getTime()) / 1000)

            const hours = Math.floor(elapsedInSeconds / 3600)
            const minutes = Math.floor((elapsedInSeconds % 3600) / 60)
            const seconds = elapsedInSeconds % 60
            if (seconds < 10) return setElapsedTime(`${hours ? `${hours}:` : ''}${minutes}:0${seconds}`)
            if (minutes < 10) return setElapsedTime(`${hours ? `${hours}:` : ''}0${minutes}:${seconds}`)
            return setElapsedTime(`${hours ? `${hours}:` : ''}${minutes}:${seconds}`)
       }, 1000)

       return () => clearInterval(intervalId)
    }, [last_edit])

    console.log(elapsedTime)

    return (
        <div
            className={`${styles.block} ${full ? styles.full : styles.empty}`}
            onClick={() => handleClick()} >
            <h3 className={styles.title}>{name}</h3>
            <p>{description}</p>
            {full ? <p>{elapsedTime}</p> : null}
        </div>
    )
}