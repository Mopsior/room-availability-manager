import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";
import styles from '@/styles/setup/styles.module.css'

export const ErrorCard = ({ title, children, footer }: { title: string, children: ReactNode, footer: string }) => {
    return (
        <Card className='mt-6'>
            <CardHeader className='pb-2'><CardTitle className={styles.error_title}>{title}</CardTitle></CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>{footer}</CardFooter>
        </Card>
    )
}