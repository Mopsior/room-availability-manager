import '@/styles/global.css'
import { Toaster } from "@/components/ui/toaster";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { inter } from './fonts'

export async function generateMetadata() {
    const t = await getTranslations('LandingPage.metadata')

    return {
        title: t('title'),
        description: t('description'),
    }
}

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const locale = await getLocale()
    const messages = await getMessages()

    return (
        <html lang={locale}>
            <body className={inter.className}>
                <NextIntlClientProvider messages={messages}>
                    {children}
                    <Toaster />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
