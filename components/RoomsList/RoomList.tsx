import { db } from "@/lib/firebase"
import { collection, DocumentData, onSnapshot, QueryDocumentSnapshot } from "firebase/firestore"
import { useState } from "react"
import { Block } from "../RoomBlock/Block"

export const RoomList = () => {
    const [rooms, setRooms] = useState<QueryDocumentSnapshot<DocumentData>[]>()

    const unsub = onSnapshot(collection(db, 'rooms'), (snapshot) => {
        setRooms(snapshot.docs)
    })

    return (
        <>
             { rooms?.map(room => <Block name={room.data().name} description={room.data().description} full={room.data().full} key={room.id} />) }
        </>
    )
}