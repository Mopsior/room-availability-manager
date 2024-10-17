import { Card, CardContent } from '../ui/card'
import styles from './styles.module.css'

export const Legend = () => {
    const rectSize = 30
    return (
        <Card className={styles.legend}>
            <CardContent className={styles.content}>
                <div className={styles.row}>
                    <svg width={rectSize} height={rectSize}>
                        <rect x={0} y={0} width={rectSize} height={rectSize} fill="#0f9e56" rx={15} />
                    </svg>
                    <p>Pokój wolny</p>
                </div>
                <div className={`${styles.row} ${styles.second_row}`}>
                     <svg width={rectSize} height={rectSize}>
                         <rect x={0} y={0} width={rectSize} height={rectSize} fill="#ec1f1f" rx={15} />
                     </svg>
                     <p>Pokój zajęty</p>
                 </div>
            </CardContent>
        </Card>
    )
}