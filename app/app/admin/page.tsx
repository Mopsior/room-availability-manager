import { RoomList } from "@/features/app/rooms/components/List";
import styles from '@/styles/app/styles.module.css'
import { Separator } from "@shadcn/separator";
import { AddRoom } from "@/features/app/rooms/components/AddRoom";
import { useTranslations } from "next-intl";
import { SwitchPanels } from "@/features/app/_components/SwitchPanel";
import { Account } from "@/features/app/_components/Account";

export default function AdminPage() {
    const t = useTranslations('AdminPage')
    return (
        <>
            <div className={styles.navbar}>
                <SwitchPanels defaultPanel="admin" haveAdmin />
                <Account/>
            </div>
            <div className={styles.title}>
                <h1>{t('title')}</h1>
                <p>{t('description')}</p>
                <AddRoom />
            </div>
            <Separator className="mb-4 mx-auto w-4/5" />
            <div className={styles.list}>
                <RoomList asAdmin />
            </div>
        </>
    )
}
