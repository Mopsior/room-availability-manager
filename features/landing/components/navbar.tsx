import styles from '@/styles/landing/components/navbar.module.css'
import { useTranslations } from 'next-intl'
import { AppRedirect, GithubRedirect } from './buttons'

export const Navbar = () => {
    const t = useTranslations('LandingPage')
    
    return (
        <nav className={styles.navbar}>
            <h1 className={styles.title}>Room Availability Manager</h1>
            <div className={styles.box}>
                <AppRedirect isPrimary/>
                <GithubRedirect />
            </div>
        </nav>
    )
}