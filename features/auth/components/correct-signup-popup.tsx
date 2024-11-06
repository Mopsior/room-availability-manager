import { Button } from "@/components/ui/button"
import { CardContent, CardHeader } from "@/components/ui/card"
import styles from '@/styles/auth/components/correct-signup-popup.module.css'
import { SquareArrowOutUpRight } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"

export const CorrectSignUpPopup = () => {
    const authT = useTranslations('auth')
    const compT = useTranslations('components.correct-signup-popup')

    return (
        <CardHeader>
            <CardContent className={`${styles.content} motion-preset-confetti motion-duration-700`}>
                <h2>{compT('label')}</h2>
                <Link href="/login">
                    <Button>{authT('login.text')}<SquareArrowOutUpRight /></Button>
                </Link>
            </CardContent>
        </CardHeader>
    )
}