import { LoaderCircle } from "lucide-react"
import styles from '@/styles/components/loading.module.css'

export const Loading = () => {
    return (
        <div className={styles.container}>
            <LoaderCircle className="animate-spin w-14 h-14" />
        </div>
    )
}