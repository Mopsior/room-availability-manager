import { AdminVerify } from "@/components/AdminVerify";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin - Room Availability App",
    description: "An app to manage room availability",
};

export default function AppLayout({
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
