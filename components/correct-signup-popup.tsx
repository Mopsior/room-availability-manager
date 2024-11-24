import { Button } from "@/components/ui/button"
import { CardContent, CardHeader } from "@/components/ui/card"
import styles from '@/styles/components/correct-signup-popup.module.css'
import { SquareArrowOutUpRight } from "lucide-react"
import Link from "next/link"
import { ClassNameValue } from "tailwind-merge"

export const CorrectSignUpPopup = ({ buttonText, className, children }: { buttonText: string, className?: ClassNameValue, children: string}) => {
    return (
        <CardHeader>
            <CardContent className={`${styles.content} motion-preset-confetti motion-duration-700 ${className}`}>
                <h2>{children}</h2>
                <Link href="/login">
                    <Button>{buttonText}<SquareArrowOutUpRight /></Button>
                </Link>
            </CardContent>
        </CardHeader>
    )
}