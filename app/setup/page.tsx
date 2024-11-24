'use server'

import { redirect } from "next/navigation"

export default async function Setup() {
    redirect('/setup/firebase')
}