'use client'

import { RoomList } from "@/components/RoomsList/RoomList"
import styles from './styles.module.css'
import { Legend } from "@/components/Legend/Legend"
import { Separator } from "@/components/ui/separator"

export default function AppHome() {
    return (
        <>
            <div className={styles.title}>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Elektronik - Dni otwarte</h1>
                <p>Klknij przycisk z numerem sali, aby zmienić jego dostępność</p>
            </div>
            <Separator className="mb-4 mx-auto w-4/5" />
            <div className={styles.list}>
                <RoomList />
            </div>
            <Legend />
        </>
    )
}