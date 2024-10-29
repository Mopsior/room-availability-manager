import { SecureLayout } from "@/components/SecurePage";
import { Providers } from "@/utils/Providers";
import { getTranslations } from "next-intl/server";

export async function generateMetadata() {
    const t = await getTranslations('SignupPage.metadata')

    return {
        title: t('title'),
        description: t('description'),
    }
}

export default function SignUpLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Providers>
            <SecureLayout loginPage={true}>
                {children}
            </SecureLayout>
        </Providers>
    );
}
