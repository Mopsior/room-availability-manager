import { AuthError } from "firebase/auth";

export const handleLoginError = (err: AuthError, t: any) => {
    switch (err.code) {
        case 'auth/invalid-credential':
            return { title: t('error.logIn.invalidCredential.title'), description: t('error.logIn.invalidCredential.description'), action: null } 
        default:
            return { title: t('error.logIn.default.title'), description: t('error.logIn.default.description'), action: '/signup' }
    }
}

export const handleSignUpError = (err: AuthError, t: any) => {
    switch (err.code) {
        case 'auth/email-already-in-use':
            return { title: t('error.signUp.emailAlreadyInUse.title'), description: t('error.signUp.emailAlreadyInUse.description'), action: '/login' }
        case 'auth/invalid-email':
            return { title: t('error.signUp.invalidEmail.title'), description: t('error.signUp.invalidEmail.description'), action: null }
        default:
            return { title: t('error.signUp.default.title'), description: t('error.signUp.default.description'), action: null }
    }
}