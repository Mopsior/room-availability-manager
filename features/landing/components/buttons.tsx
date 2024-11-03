import { Button } from "@/components/ui/button"
import { Github, SquareArrowOutUpRight } from "lucide-react"
import { useTranslations } from "next-intl"
import styles from "@/styles/landing/components/buttons.module.css"
import Link from "next/link"

/**
 * /app redirect button
 * @param {boolean} isPrimary - make button primary instead od outline
 */
export const AppRedirect = ({ isPrimary }: { isPrimary?: boolean}) => {
    const t = useTranslations('buttons')

    return (
        <Link href='/app'>
            <Button variant={isPrimary ? 'default' : 'outline'} className={styles.button}>
                <p>{t('appReferal')}</p>
                <SquareArrowOutUpRight />
            </Button>
        </Link>
    )
}

/**
 * Github Repository redirect button
 * @param {boolean} big - make button with text instead of icon only
 */
export const GithubRedirect = ({ big }: { big?: boolean }) => {
    const t = useTranslations('buttons')

    return (
        <Link
        href='https://github.com/mopsior/room-availability-manager'
        target='_blank'>
            <Button variant={'outline'} className={`${!big && '[&_svg]:size-[28px] w-0 p-6'} ${styles.button}`}>
                {big && <p>{t('githubRepo')}</p>}
                <Github color="#050505" size={28}/>
            </Button>
        </Link>
    )
}