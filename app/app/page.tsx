'use client'

import { RoomList } from "@/components/RoomsList/RoomList"
import styles from './styles.module.css'
import { Legend } from "@/components/Legend/Legend"

export default function AppHome() {

    return (
        <>
            <div className={styles.title}>
                <h1>Elektronik - Dni otwarte</h1>
                <p>Klknij przycisk z numerem sali, aby zmienić jego dostępność</p>
            </div>
            <div className={styles.list}>
                <RoomList />
            </div>
            <Legend />
        </>
    )
}