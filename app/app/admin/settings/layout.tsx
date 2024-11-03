import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SwitchPanels } from "@/features/app/_components/SwitchPanel"
import { Account } from "@/features/app/_components/Account"
import appStyles from '@/styles/app/styles.module.css'
import { useTranslations } from "next-intl"

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const t = useTranslations('AdminSettingsPage')

    return (
        <>
        <div className={appStyles.navbar}>
            <SwitchPanels defaultPanel="settings" haveAdmin haveSettings />
            <Account haveSettings/>
        </div>
        <div className={appStyles.title}>
            <h1>{t('title')}</h1>
            <p>{t('description')}</p>
            <div className="gap-2 mt-2 flex justify-center">
                <Link href={'/app/admin/settings/users'}>
                    <Button variant={'outline'}>{t('tabs.users')}</Button>
                </Link>
                <Link href={'/app/admin/settings/config'}>
                    <Button variant={'outline'}>{t('tabs.config')}</Button>
                </Link>
            </div>
        </div>
        <Separator className="mb-4 mx-auto w-4/5" />
        {children}
        </>
    );
}
