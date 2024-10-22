'use client'

import { deleteDoc, doc, Timestamp, updateDoc } from 'firebase/firestore'
import styles from '@/styles/app/rooms/components/Room.module.css'
import { db } from '@/utils/firebase/firebase'
import { useEffect, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@shadcn/popover'
import { Button } from '@shadcn/button'
import { useToast } from '@/hooks/use-toast'
import { UpdateDialog } from './UpdateDialog'

/**
 * Room block component
 * @param id Room document ID
 * @param name Room name (ex. room number: 101)
 * @param description Room description (ex. Meeting room)
 * @param full Is room occupied
 * @param last_edit Last room occupation update date
 */
export const Room = ({ id, name, description, full, last_edit }: { id: string, name: string, description: string, full: boolean, last_edit: Timestamp }) => {
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

    return (
        <div
            className={`${styles.block} ${full ? styles.full : styles.empty}`}
            onClick={() => handleClick()} >
            <h3 className={`${styles.title} scroll-m-20 text-2xl font-semibold tracking-tight`}>{name}</h3>
            <p>{description}</p>
            {full && <p className={styles.small}>{elapsedTime}</p>}
        </div>
    )
}

/**
 * Admin Room component
 * @param id Room document ID
 * @param name Room name (ex. room number: 101)
 * @param description Room description (ex. Meeting room)
 * @param full Is room occupied
 * @param last_edit Last room occupation update date
 */
export const AdminRoom = ({ id, name, description, full, last_edit }: { id: string, name: string, description: string, full: boolean, last_edit: Timestamp }) => {
    const [elapsedTime, setElapsedTime] = useState<string>('')
    const { toast } = useToast()

    const changeAvailability = async () => {
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

    const deleteRoom = async () => {
        try {
            await deleteDoc(doc(db, 'rooms', id))
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

    const copyID = async () => {
        try {
            await navigator.clipboard.writeText(id)
            toast({
                title: 'Skopiowano ID'
            })
        } catch (err) {
            console.error(err)
            toast({
                title: "Nie udało się skopiować ID",
                description: "Sprawdź ustawienia przeglądarki i spróbuj ponownie",
                variant: 'destructive'
            })
        }
    }
 
    return (
        <div
            className={`${styles.block} ${full ? styles.full : styles.empty} ${styles.admin_block}`}>
            <span className={styles.small}>{id}</span>
            <h3 className={`${styles.title} scroll-m-20 text-2xl font-semibold tracking-tight`}>{name}</h3>
            <p>{description}</p>
            {full && <p className={styles.small}>{elapsedTime}</p>}
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant='outline' className={`mt-2 ${styles.button}`}>Opcje</Button>
                </PopoverTrigger>
                <PopoverContent asChild>
                    <div className={styles.content}>
                        <Button onClick={() => changeAvailability()} variant={'outline'} className='mr-2'>{full ? 'Opuść pokój' : 'Zajmij pokój'}</Button>
                        <Button onClick={() => copyID()} variant={'outline'} className='ml-2'>Skopiuj ID</Button>
                        <UpdateDialog id={id} name={name} description={description} />
                        <Button onClick={() => deleteRoom()} variant={'destructive'} className='ml-2 mt-2'>Usuń pokój</Button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}