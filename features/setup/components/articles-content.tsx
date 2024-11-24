'use client'

import { Button } from "@/components/ui/button"
import { SquareArrowOutUpRight } from "lucide-react"
import Link from "next/link"
import Image from 'next/image'
import { Code } from "./code"
import { Callout } from "./callout"
import { InlineCode } from "./inline-code"
import { ReactNode } from "react"

export const FirebaseAuthArticle = () => {
    return (
        <>
            <Title>Setup firebase auth</Title>
            <p className="mt-2">This project uses email and password authentication for users.
                Before creating your first account, you need to enable this method in Firebase Panel.</p>
            <Ol>
                <li>Go to <Link href={'https://console.firebase.google.com/project/_/authentication/providers'}>
                <Button variant={'link'} className="text-primary text-base font-bold px-0 decoration-primary">Authenication in Firebase console <SquareArrowOutUpRight /></Button></Link></li>
                <Image 
                    src='/setup/signup-providers.png' alt="Signup Providers"
                    width={978} height={446} />
                <li className="mt-4 mb-2">Enable <b>Email/Password</b> and save</li>
                <Image
                    src='/setup/signup-email.png' alt="Signup Email checkbox"
                    width={978} height={446} />
                <li className="mt-4">Now let&apos;s configure other settings</li>
            </Ol>
        </>
    )
}

export const FirestoreRulesArticle = () => {
    const code = `rules_version = '2';

service cloud.firestore {
    match /databases/{database}/documents {
        match /{document=**} {
            allow read, write: if false;
        }
        match /rooms/{document=**} {
            allow read: if request.auth != null;
        allow update: if (request.resource.data.diff(resource.data).affectedKeys()
            .hasOnly(['full', 'last_edit']));
        allow update, create, delete: if request.auth.uid in
            get(/databases/$(database)/documents/config/roles).data.admin;
        }
        match /config/roles {
            allow read: if request.auth != null;
        allow update, create, delete: if request.auth.uid in
            get(/databases/$(database)/documents/config/roles).data.admin;
        }
        match /config/settings {
            allow read: if true;
        allow update, create, delete: if request.auth.uid in
            get(/databases/$(database)/documents/config/roles).data.admin;
        }
    }
}`

    return (
        <>
        <Title>Add Firestore securtiy rules</Title>
        <p>You need to add Firebase secuirty rules, to secure your database from attacs.</p>
        <Ol>
            <li className="mb-1">
                Go to <Link href={'https://console.firebase.google.com/project/_/firestore/rules'}>
                <Button
                    variant={'link'}
                    className="text-primary text-base font-bold px-0 decoration-primary">Firestore security rules <SquareArrowOutUpRight /></Button></Link>
            </li>
            <li className="mb-6">
                Paste code (copy from below)
                <div className="relative mt-2">
                    <Code code={code}></Code>
                </div>
            </li>
            <li className="mb-4">
                Publish rules
                <Image src={'/setup/firestore-rules-code.png'} alt='Firestore rules panel' width={1354} height={687} />
            </li>
            <li className="mb-2">
                Continiue to translations
            </li>
        </Ol>
        </>
    )
}

export const TranslationArticle = () => {
    const code = `import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async () => {
    const locale = 'pl'

    return {
        locale,
        messages: (await import (\`@/messages/\${locale}.json\`)).default
    }
})`

    return (
        <>
            <Callout>To handle all texts, library <InlineCode variant="lighter">next-intl</InlineCode> was used.</Callout>
            <Title>Configure app translation</Title>
            <p>All texts used in this project (without /setup page) are saved in translation file to easily personalise app.</p>
            <p className="mt-1">You can find translation file in <InlineCode>messages/pl.json</InlineCode>.</p>
            <Title>Change app language code</Title>
            <Callout>
               <p>Project supports <b>only one language</b> (it mean, there&apos;s no translation option for user aka. no i18n routing).</p>
            </Callout>
            <Ol>
                <li>
                    Go to <InlineCode>i18n/request.ts</InlineCode> and change <InlineCode>locale</InlineCode> variable.
                    <Code code={code} words={["'pl'"]} className="mt-2" />
                </li>
                <li className="mt-2">
                    Change file name from <InlineCode>messages/pl.json</InlineCode> to your language code.
                </li>
            </Ol>
        </>
    )
}

const Ol = ({ children }: { children: ReactNode }) => {
    return (
        <ol className="list-decimal list-inside marker:font-bold">
            {children}
        </ol>
    )
}

const Title = ({ children }: { children: ReactNode }) => {
    return (
        <h2 className="inline-block text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            {children}
        </h2>
    )
}