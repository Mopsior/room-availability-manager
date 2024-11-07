import { AdminVerify } from "@/components/AdminVerify";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations('AdminPage.metadata')

    return {
        title: t('title'),
        description: t('description'),
    }
}

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
        <AdminVerify>
            {children}
        </AdminVerify>
        </>
    );
}
