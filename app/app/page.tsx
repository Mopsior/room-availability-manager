'use client'

import { RoomList } from "@/features/app/rooms/components/List"
import styles from '@/styles/app/styles.module.css'
import { Legend } from "@/features/app/rooms/components/Legend"
import { Separator } from "@/components/ui/separator"
import { Account } from "@/features/app/_components/Account"

export default function AppHome() {
    return (
        <>
            <div className={styles.navbar}>
                <Account />
            </div>
            <div className={styles.title}>
                <h1>Elektronik - Dni otwarte</h1>
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