import { Drill, MousePointerClick, Timer } from "lucide-react"
import { Block } from "./block"
import styles from '@/styles/landing/components/features.module.css'
import { useTranslations } from "next-intl"

export const Features = () => {
    const t = useTranslations('LandingPage.features')

    return (
        <main className={styles.main}>
            <Block title={t('first.title')} icon={<Timer />}>
                {t.raw('first.description')}
            </Block>
            <Block title={t('second.title')} icon={<MousePointerClick />}>
                {t.raw('second.description')}
            </Block>
            <Block title={t('third.title')} icon={<Drill />}>
                {t.raw('third.description')}
            </Block>
        </main>
    )
}