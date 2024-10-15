import { db } from "@/lib/firebase"
import { collection, DocumentData, onSnapshot, QueryDocumentSnapshot } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Block } from "../RoomBlock/Block"

export const RoomList = () => {
    const [rooms, setRooms] = useState<QueryDocumentSnapshot<DocumentData>[]>()

    useEffect(() => {
        const unsub = onSnapshot(collection(db, 'rooms'), (snapshot) => {
            const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";
            console.log(source, " data: ", snapshot.docs);
            console.log(snapshot.docChanges())
            setRooms(snapshot.docs)
        })
        return () => {console.log('unsubscribed'); unsub()}
    }, [])

    return (
        <>
             { rooms?.map(room => <Block name={room.data().name} description={room.data().description} full={room.data().full} id={room.id} key={room.id} />) }
        </>
    )
}