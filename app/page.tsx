'use client'

import { useTranslations } from "next-intl"

export default function Home() {
    const t = useTranslations('LandingPage')

    return (
        <>
            {t('title')}
        </>
    )
}
