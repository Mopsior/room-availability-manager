import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { TableCell, TableRow } from "@/components/ui/table";
import { changeAdminStatus } from "../actions/change-admin-status";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { UserRecord } from "firebase-admin/auth";

export const UserRow = ({ user, adminsList, onDelete }: { user: UserRecord, adminsList: string[] | null, onDelete: any }) => {
    const { toast } = useToast()
    const t = useTranslations('AdminSettingsPage.users')

    const onChange = async (id: string) => {
        const {error} = await changeAdminStatus(id, adminsList)
        if (error) {
            console.error(error)
            toast({
                title: t('error.status.title'),
                description: t('error.status.description'),
                variant: "destructive"
            })
        }

        toast({
            title: t('success.status.title'),
            description: t('success.status.description'),
        })
    }

    return (
        <TableRow key={user.uid}>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.uid}</TableCell>
            <TableCell>{user.metadata.creationTime}</TableCell>
            <TableCell>{user.metadata.lastSignInTime}</TableCell>
            <TableCell><Switch 
                checked={adminsList?.includes(user.uid)}
                onCheckedChange={() => onChange(user.uid)}
            /></TableCell>
            <TableCell><Button onClick={() => onDelete(user.uid)}>{t('table.delete')}</Button></TableCell>
        </TableRow>
    )
}