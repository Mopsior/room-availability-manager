import { SecureLayout } from "@/components/SecurePage";
import { Legend } from "@/features/app/rooms/components/Legend";
import { Providers } from "@/utils/Providers";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations('App.metadata')

    return {
        title: t('title'),
        description: t('description'),
    }
}

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Providers>
            <SecureLayout>
                {children}
                <Legend />
            </SecureLayout>
        </Providers>
    );
}
