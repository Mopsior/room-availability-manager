import { Button } from '@/components/ui/button'
import styles from '@/styles/landing/components/footer.module.css'
import { SquareArrowOutUpRight } from 'lucide-react'
import Link from 'next/link'

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>
                Made by <Link href={'https://mopsior.pl'}><Button variant={'link'}>@mopsior</Button></Link>
                using <Link href={'https://ui.shadcn.com'}><Button variant={'link'}>shadcn/ui</Button></Link>
                and <Link href={'https://www.flaticon.com/free-icons/arrows'}><Button variant={'link'}>flaticon</Button></Link>
            </p>
            Project under GNU GPL3 license - <Link href={'https://github.com/mopsior/room-availability-manager'}><Button variant={'link'}>original Github Repo<SquareArrowOutUpRight /></Button></Link>
        </footer>
    )
}