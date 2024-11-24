import { Separator } from '@/components/ui/separator';
import styles from '@/styles/setup/styles.module.css'
import { catchError } from '@/utils/catch-error';
import { db } from '@/utils/firebase/firebaseServer';
import { redirect } from 'next/navigation';

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [checkError, checkData] = await catchError(db.collection('config').doc('settings').get())
    if (checkError) return redirect('/login')
    if (checkData.data()?.appAfterSetup) return redirect('/login')
    return (
        <>
            <div className={styles.title}>
                <h1>Setup</h1>
                <p>Here you&apos;ll setup whole app. Follow the steps</p>
                <Separator className="mb-4 mx-auto w-4/5 mt-4" />
            </div>
            <main className={styles.main}>
                {children}
            </main>
        </>
    );
}
