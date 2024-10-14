import firebaseConfig from '@/firebaseConfig'
import { getApps, initializeApp } from 'firebase/app'

const app = getApps().length === 0 ?
    initializeApp(firebaseConfig) : getApps()[0]

export default app