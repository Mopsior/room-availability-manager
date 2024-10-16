import { SecureLayout } from "@/components/SecurePage";
import { Providers } from "@/utils/Providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Room Availability App",
    description: "An app to manage room availability",
};

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Providers>
            <SecureLayout>
                {children}
            </SecureLayout>
        </Providers>
    );
}
