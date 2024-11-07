import { Switch } from '@/components/ui/switch'
import { toast } from '@/hooks/use-toast'
import styles from '@/styles/app/admin/settings/components/control.module.css'
import { db } from '@/utils/firebase/firebase'
import { doc, updateDoc } from 'firebase/firestore'
import { useTranslations } from 'next-intl'
import { revalidate } from '../actions/revalidate'

export const Control = ({ title, children, fieldName, isChecked }: { title: string, children: string, fieldName: string, isChecked: boolean }) => {
    const t = useTranslations('components.Control')

    const handleClick = async () => {
        try {
            await updateDoc(doc(db, 'config', 'settings'), {
                [fieldName]: !isChecked
            })
            toast({
                title: t('toast.success.title'),
                description: t('toast.success.description', { settingName: fieldName}),
            })
        if (fieldName === 'disableLandingPage') revalidate('/')
        } catch (err) {
            console.error(err)
            toast({
                title: t('toast.error.title'),
                description: t('toast.error.description', { settingName: fieldName}),
                variant: 'destructive'
            })
        }
    }

    return (
        <div className={styles.control}>
            <div>
                <h2>{title}</h2>
                <p>{children}</p>
            </div>
            <Switch checked={isChecked} onCheckedChange={() => handleClick()} />
        </div>
    )
}