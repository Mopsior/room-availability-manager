'use client'

import styles from '@/styles/landing/components/example-room.module.css'
import { useEffect, useState } from 'react'
import { useTranslations } from 'use-intl'

export const ExampleRoom = () => {
    const [full, setFull] = useState<boolean>(false)
    const [elapsedTime, setElapsedTime] = useState<string>('0:00')
    const [lastDate, setLastDate] = useState<Date>(new Date())

    const t = useTranslations('LandingPage.hero.exampleRoom')

    const handleClick = () => {
        setFull(!full)
        setElapsedTime('0:00')
        setLastDate(new Date())
    }

    useEffect(() => {
        if (!full) return
        const intervalId = setInterval(() => {
            const now = new Date()
            const elapsedInSeconds = Math.floor((now.getTime() - lastDate.getTime()) / 1000)
            const hours = Math.floor(elapsedInSeconds / 3600)
            const minutes = Math.floor((elapsedInSeconds % 3600) / 60)
            const seconds = elapsedInSeconds % 60
            if (seconds < 10) return setElapsedTime(`${hours ? `${hours}:` : ''}${minutes}:0${seconds}`)
            if (minutes < 10) return setElapsedTime(`${hours ? `${hours}:` : ''}0${minutes}:${seconds}`)
            return setElapsedTime(`${hours ? `${hours}:` : ''}${minutes}:${seconds}`)
        }, 1000)

       return () => clearInterval(intervalId)
    }, [full])

    return (
        <div
            className={`${styles.block} ${full ? styles.full : styles.empty}`}
            onClick={() => handleClick()} >
            <h3 className={styles.title}>{t('name')}</h3>
            <p>{t('description')}</p>
            {full && <p className={styles.small}>{elapsedTime}</p>}
        </div>
    )
}