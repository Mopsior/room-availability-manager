import { Legend } from "@/components/Legend/Legend";
import { AdminRoomList } from "@/components/RoomsList/RoomList";
import styles from './../styles.module.css'
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
    return (
        <>
            <div className={styles.title}>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Panel Administracyjny</h1>
                <p>Aby zarządzać pokojami, rozwiń opcje klikając w przycisk</p>
                <Button className="mt-4" variant={'outline'}>Dodaj pokój</Button>
            </div>
            <Separator className="mb-4 mx-auto w-4/5" />
            <div className={styles.list}>
                <AdminRoomList />
            </div>
            <Legend />
        </>
    )
}
