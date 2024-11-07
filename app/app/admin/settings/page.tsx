import { useTranslations } from "next-intl"
import styles from '@/styles/app/admin/settings/styles.module.css'
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminSettingsPage() {
    const t = useTranslations('AdminSettingsPage')
    return (
        <div className={styles.container}>
            <Card className={styles.card}>
                <CardHeader>
                    <CardTitle>{t('text')}</CardTitle>
                </CardHeader> 
            </Card>
        </div>
    )
}