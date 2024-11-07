'use client'

import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@shadcn/select"
import { useTranslations } from "next-intl"

export const SwitchPanels = ({ defaultPanel = 'app', haveAdmin, haveSettings}: { defaultPanel: 'app' | 'admin' | 'settings', haveAdmin?: boolean, haveSettings?: boolean}) => {
    const router = useRouter()
    const t = useTranslations('components.SwitchPanel')

    const handleChange = (value: string) => {
        if (value === 'admin') return router.push('/app/admin')
        if (value === 'app') return router.push('/app')
        if (value === 'settings') return router.push('/app/admin/settings')
    }

    return (
        <Select defaultValue={defaultPanel} onValueChange={(value) => handleChange(value)}>
            <SelectTrigger className="w-auto">
                <SelectValue placeholder={t('selectPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
                { haveSettings && <SelectItem value="settings">{t('settingsPanel')}</SelectItem> }
                { haveAdmin && <SelectItem value="admin">{t('adminPanel')}</SelectItem> }
                <SelectItem value="app">{t('userPanel')}</SelectItem>
            </SelectContent>
        </Select>
    )
}