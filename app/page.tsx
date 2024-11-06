import { Navbar } from "@/features/landing/components/navbar"
import { geist } from "./fonts"
import { Hero } from "@/features/landing/components/hero"
import { Features } from "@/features/landing/components/features"
import styles from '@/styles/landing/styles.module.css'
import { AppRedirect, GithubRedirect } from "@/features/landing/components/buttons"
import { useTranslations } from "next-intl"
import { Footer } from "@/features/landing/components/footer"
import { HandleLAndingPageSettings } from "@/utils/settings/disable-landing-page"

export default function Home() {
    const t = useTranslations('LandingPage')

    return (
        <HandleLAndingPageSettings>
            <div className={geist.className}>
                <Navbar />
                <Hero />
                <Features />
                <div className={styles.redirects}>
                    <h3 className={styles.title}>{t('redirects.title')}</h3>
                    <div className={styles.buttons}>
                        <AppRedirect isPrimary/>
                        <GithubRedirect big />
                    </div>
                </div>
                <Footer />
            </div>
        </HandleLAndingPageSettings>
    )
}