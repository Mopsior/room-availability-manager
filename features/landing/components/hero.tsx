import styles from '@/styles/landing/components/hero.module.css'
import { ExampleRoom } from './example-room'
import { useTranslations } from 'next-intl'
import arrow from '../imgs/arrow.png'
import Image from 'next/image'

export const Hero = () => {
    const t = useTranslations('LandingPage.hero')

    return (
        <main className={styles.main}>
            <h1 className={styles.title}>{t('title')}</h1>
            <div className={styles.example}>
                <ExampleRoom />
                <div className={styles.arrow}>
                    <Image src={arrow} alt='arrow icon' />
                    <p>{t('example')}</p>
                </div>
            </div>
        </main>
    )
}