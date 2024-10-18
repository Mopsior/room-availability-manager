import { Legend } from "@/components/Legend/Legend";
import { RoomList } from "@/components/RoomsList/RoomList";
import styles from './../styles.module.css'
import { Separator } from "@/components/ui/separator";
import { AddRoom } from "@/components/AddRoom/AddRoom";
import { SwitchPanels } from "@/components/SwitchPanels/SwitchPanel";

export default function AdminPage() {
    return (
        <>
            <SwitchPanels />
            <div className={`${styles.title} [@media(max-width:700px)]:mt-[60px]`}>
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
