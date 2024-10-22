import { Legend } from "@/features/app/rooms/components/Legend";
import { RoomList } from "@/features/app/rooms/components/List";
import styles from './../styles.module.css'
import { Separator } from "@shadcn/separator";
import { AddRoom } from "@/features/app/rooms/components/AddRoom";
import { SwitchPanels } from "@/features/app/_components/SwitchPanel";
import { Account } from "@/features/app/_components/Account";

export default function AdminPage() {
    return (
        <>
            <div className={styles.navbar}>
                <SwitchPanels />
                <Account />
            </div>
            <div className={styles.title}>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Panel Administracyjny</h1>
                <p>Aby zarządzać pokojami, rozwiń opcje klikając w przycisk</p>
                <AddRoom />
            </div>
            <Separator className="mb-4 mx-auto w-4/5" />
            <div className={styles.list}>
                <RoomList asAdmin />
            </div>
            <Legend />
        </>
    )
}
