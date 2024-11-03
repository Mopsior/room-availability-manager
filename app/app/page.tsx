'use client'

import { RoomList } from "@/features/app/rooms/components/List"
import styles from '@/styles/app/styles.module.css'
import { Separator } from "@/components/ui/separator"
import { Account } from "@/features/app/_components/Account"
import { useTranslations } from "next-intl"

export default function AppHome() {
    const t = useTranslations('App')
    return (
        <>
            <div className={styles.navbar}>
                <Account />
            </div>
            <div className={styles.title}>
                <h1>{t('placeName')}</h1>
                <p>{t('description')}</p>
            </div>
            <Separator className="mb-4 mx-auto w-4/5" />
            <div className={styles.list}>
                <RoomList />
            </div>
        </>
    )
}