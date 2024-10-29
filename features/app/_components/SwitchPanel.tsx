'use client'

import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shadcn/select"
import { useTranslations } from "next-intl"

export const SwitchPanels = () => {
    const router = useRouter()
    const t = useTranslations('components.SwitchPanel')

    const handleChange = (value: string) => {
        if (value === 'admin') return router.push('/app/admin')
        if (value === 'app') return router.push('/app')
    }

    return (
        <Select defaultValue="admin" onValueChange={(value) => handleChange(value)}>
            <SelectTrigger className="w-auto">
                <SelectValue placeholder={t('selectPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="admin">{t('adminPanel')}</SelectItem>
                <SelectItem value="app">{t('userPanel')}</SelectItem>
            </SelectContent>
        </Select>
    )
}