import { Card, CardContent } from '@shadcn/card'
import styles from '@/styles/app/rooms/components/Legend.module.css'
import { useTranslations } from 'next-intl'

export const Legend = () => {
    const t = useTranslations('components.Legend')
    const rectSize = 30
    return (
        <Card className={styles.legend}>
            <CardContent className={styles.content}>
                <div className={styles.row}>
                    <svg width={rectSize} height={rectSize}>
                        <rect x={0} y={0} width={rectSize} height={rectSize} fill="#0f9e56" rx={15} />
                    </svg>
                    <p>{t('free')}</p>
                </div>
                <div className={`${styles.row} ${styles.second_row}`}>
                     <svg width={rectSize} height={rectSize}>
                         <rect x={0} y={0} width={rectSize} height={rectSize} fill="#ec1f1f" rx={15} />
                     </svg>
                     <p>{t('occupied')}</p>
                 </div>
            </CardContent>
        </Card>
    )
}