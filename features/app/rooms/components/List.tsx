'use client'
import { db } from "@fb"
import { collection, DocumentData, onSnapshot, QueryDocumentSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { AdminRoom, Room } from "./Room"

export const RoomList = ({ asAdmin }: { asAdmin?: boolean }) => {
    const [rooms, setRooms] = useState<QueryDocumentSnapshot<DocumentData>[]>()

    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'rooms'), (snapshot) => {
            setRooms(snapshot.docs)
        })
        return () => {console.log('unsubscribed'); unsub()}
    }, [])

    if (asAdmin) {
        return (
            <>
                { rooms?.map(room => <AdminRoom name={room.data().name} description={room.data().description} full={room.data().full} id={room.id} last_edit={room.data().last_edit} key={room.id}/>) }
            </>
        )
    }

    return (
        <>
            { rooms?.map(room => <Room name={room.data().name} description={room.data().description} full={room.data().full} last_edit={room.data().last_edit} id={room.id} key={room.id} />) }
        </>
    )
}