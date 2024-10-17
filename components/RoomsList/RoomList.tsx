'use client'
import { db } from "@/lib/firebase"
import { collection, DocumentData, onSnapshot, QueryDocumentSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { AdminBlock, Block } from "../RoomBlock/Block"
import { AddRoom } from "../AddRoom/AddRoom"

export const RoomList = () => {
    const [rooms, setRooms] = useState<QueryDocumentSnapshot<DocumentData>[]>()

    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'rooms'), (snapshot) => {
            setRooms(snapshot.docs)
        })
        return () => {console.log('unsubscribed'); unsub()}
    }, [])

    return (
        <>
             { rooms?.map(room => <Block name={room.data().name} description={room.data().description} full={room.data().full} last_edit={room.data().last_edit} id={room.id} key={room.id} />) }
        </>
    )
}

export const AdminRoomList = () => {
    const [rooms, setRooms] = useState<QueryDocumentSnapshot<DocumentData>[]>()

    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'rooms'), (snapshot) => {
            setRooms(snapshot.docs)
        })
        return () => {console.log('unsubscribed'); unsub()}
    }, [])

    return (
        <>
            {/* <AddRoom /> */}
            { rooms?.map(room => <AdminBlock name={room.data().name} description={room.data().description} full={room.data().full} id={room.id} last_edit={room.data().last_edit} key={room.id}/>) }
        </>
    )
}