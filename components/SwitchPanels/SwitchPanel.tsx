'use client'

import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export const SwitchPanels = () => {
    const router = useRouter()

    const handleChange = (value: string) => {
        if (value === 'admin') return router.push('/app/admin')
        if (value === 'app') return router.push('/app')
    }

    return (
        <Select defaultValue="admin" onValueChange={(value) => handleChange(value)}>
            <SelectTrigger className="w-auto">
                <SelectValue placeholder="Wybierz panel" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="admin">Panel Administracyjny</SelectItem>
                <SelectItem value="app">Podstawowa Aplikacja</SelectItem>
            </SelectContent>
        </Select>
    )
}