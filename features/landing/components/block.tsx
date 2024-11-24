import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import styles from '@/styles/landing/components/block.module.css'

/**
 * 
 * @param {string} title - The title of the block
 * @param {any} icon - The icon to display next to title
 * @param {string} children - The content of the block (is dangerouslySetInnerHTML)
 */
export const Block = ({ title, icon, children }: { title: string, icon: any, children: string }) => {
    return (
        <Card className={styles.block}>
            <CardHeader className='flex-row gap-2'>
                {icon}
                <CardTitle className={`!mt-0 ${styles.title}`}>{title}</CardTitle>
            </CardHeader>
            <CardContent className={styles.content}>
                <p dangerouslySetInnerHTML={{__html: children}} />
            </CardContent>
        </Card>
    )
}