'use client'

import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import styles from './styles.module.css'

export const SwitchPanels = () => {
    const router = useRouter()

    const handleChange = (value: string) => {
        if (value === 'admin') return router.push('/app/admin')
        if (value === 'app') return router.push('/app')
    }

    return (
        <div className={styles.panel}>
            <Select defaultValue="admin" onValueChange={(value) => handleChange(value)}>
                <SelectTrigger>
                    <SelectValue placeholder="Wybierz panel" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="admin">Panel Administracyjny</SelectItem>
                    <SelectItem value="app">Podstawowa Aplikacja</SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}