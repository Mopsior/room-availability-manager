import { AuthError } from "firebase/auth";

export const handleLoginError = (err: AuthError) => {
    switch (err.code) {
        case 'auth/invalid-credential':
            return { title: 'Błąd logowania', description: 'Niepoprawne dane logowania. Spróbuj ponownie.', action: null } 
        default:
            return { title: 'Błąd logowania', description: 'Błąd podczas logowania. Upewnij się, ze masz konto.', action: '/signup' }
    }
}

export const handleSignUpError = (err: AuthError) => {
    switch (err.code) {
        case 'auth/email-already-in-use':
            return { title: 'Takie konto już istnieje', description: 'Konto z podanym adresem e-mail już istnieje. Spróbuj zalogować się na swoje konto.', action: '/login' }
        case 'auth/invalid-email':
            return { title: 'Błąd rejestracji', description: 'Niepoprawny adres e-mail.', action: null }
        default:
            return { title: 'Błąd rejestracji', description: 'Błąd podczas rejestracji. Spróbuj ponownie.', action: null }
    }
}