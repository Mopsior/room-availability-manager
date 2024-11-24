'use server'

import { checkFirebase } from '@/features/setup/steps/check-firebase'
import { catchError } from '@/utils/catch-error'
import { ErrorCard } from '@/features/setup/components/error-card'
import { SetupSteps } from '@/features/setup/components/setup-steps'
import { redirect } from 'next/navigation'
import { checkDB } from '@/features/setup/steps/check-db'

export default async function Setup() {
    const [checkFirebaseError, checkFirebaseStatus] = await catchError(checkFirebase())
    if (checkFirebaseError) {
        console.error(checkFirebaseError.message)
    }

    const [checkDBError, checkDBStatus] = await catchError(checkDB())
    if (checkDBError) {
        console.error(checkDBError.message)
    }

    if (checkFirebaseStatus && checkDBStatus) {
        return redirect('/setup/self-configure')
    }

    return (
        <>
            <SetupSteps
                selected={[true, false, false]}
                checked={[(checkFirebaseStatus && checkDBStatus) ?? false, false, false]} />

            {checkFirebaseError && (
                <ErrorCard title='Configuration Error' footer='Check all configuration and .env files'>
                    {checkFirebaseError.message}
                </ErrorCard>
            )}
            {checkDBError && (
                <ErrorCard title='Firestore setup error' footer='Check if adminsdk key is correct, all configuration and .env files'>
                    {checkDBError.message}
                </ErrorCard>
            )}
        </>
    )
}