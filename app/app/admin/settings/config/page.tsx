'use client'

import { Control } from "@/features/app/admin/settings/components/control"
import styles from '@/styles/app/admin/settings/config.module.css'
import { db } from "@/utils/firebase/firebase"
import { doc, DocumentData, onSnapshot } from "firebase/firestore"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

export default function AdminSettingsConfigPage() {
    const t = useTranslations('AdminSettingsPage.config')

    const [settings, setSettings] = useState<DocumentData | undefined>()

    useEffect(() => {
        const unsub = onSnapshot(doc(db, 'config', 'settings'), (doc) => {
            setSettings(doc.data())
        })

        return () => {console.log('unsubscribed'); unsub()}
    }, [])

    return (
        <div className={styles.list}>
            <Control title={t('allowRegister.title')} fieldName="allowRegister" isChecked={settings?.allowRegister}>{t('allowRegister.description')}</Control>
            <Control title={t('disableLandingPage.title')} fieldName="disableLandingPage" isChecked={settings?.disableLandingPage}>{t('disableLandingPage.description')}</Control>
        </div>
    )
}