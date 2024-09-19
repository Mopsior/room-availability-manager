import { getLoggedInUser } from "@/lib/server/appwrite"
import { redirect } from "next/navigation"

export default async function LoginLayout({ 
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    const user = await getLoggedInUser()
    if (user) redirect("/rooms")
        
    return (
        <html lang="en">
        <body>
            {children}
        </body>
        </html>
    )
}