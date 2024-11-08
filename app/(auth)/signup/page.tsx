'use client'

import { createAccount } from '@/utils/firebase/auth-server'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import styles from '@/styles/app/auth/styles.module.css'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@shadcn/form'
import { Input } from '@shadcn/input'
import { Button } from '@shadcn/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@shadcn/card'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { handleSignUpError } from '@/utils/firebase/handleAuthError'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { CorrectSignUpPopup } from '@/features/auth/components/correct-signup-popup'
import { checkAllowRegister } from '@/features/app/actions/check-allow-register'
import { catchError } from '@/utils/catch-error'
import { AuthError } from 'firebase/auth'

export default function SignUp() {
    const t = useTranslations('auth')

    const formSchema = z.object({
        email: z.string().email({ message: t('form.schemaMessage.email') }),
        password: z.string()
            .min(6, { message: t('form.schemaMessage.password.min') })
            .max(4096, { message: t('form.schemaMessage.password.max') })
            .superRefine((password, ctx) => {
                let message
                const containsUppercase = (ch: string) => /[A-Z]/.test(ch)
                const containsLowercase = (ch: string) => /[a-z]/.test(ch)
                const containsSpecialChar = (ch: string) =>
                    /[`!@#$%^&*()_\-+=\[\]{}':"\\|,.<>\/?~ ]/.test(ch)
                let countOfUpperCase = 0,
                    countOfLowerCase = 0,
                    countOfNumbers = 0,
                    countOfSpecialChar = 0
                for (let i = 0; i < password.length; i++) {
                    const ch = password.charAt(i)
                    if (!isNaN(+ch)) countOfNumbers++
                    else if (containsUppercase(ch)) countOfUpperCase++
                    else if (containsLowercase(ch)) countOfLowerCase++
                    else if (containsSpecialChar(ch)) countOfSpecialChar++
                }
                if (countOfLowerCase < 1) message = t.rich('form.schemaMessage.password.lowerCase')
                if (countOfUpperCase < 1) message = t.rich('form.schemaMessage.password.upperCase')
                if (countOfNumbers < 1) message = t.rich('form.schemaMessage.password.number')
                if (countOfSpecialChar < 1) message = t.rich('form.schemaMessage.password.special')

                if (message) {
                    ctx.addIssue({
                        code: "custom",
                        message: message.toString(),
                    })
                }
            })
    })

    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const [openPopup, setOpenPopup] = useState<boolean>(false)

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const allowRegister = await checkAllowRegister()

        if (!allowRegister) {
            return toast({
                variant: 'destructive',
                title: t('signin.disabled.title'),
                description: t('signin.disabled.description'),
            })
        }

        const [error, user] = await catchError(createAccount(values.email, values.password))
        if (error) {
            const { title, description, action } = handleSignUpError(error as AuthError, t)
            return toast({
                variant: 'destructive',
                title: title,
                description: description,
                action: action ? <Button variant={'outline'} className='bg-transparent' onClick={() => { router.push('/login') }}>{t('login.text')}</Button> : undefined
            })
        }

        console.log(user)
        return setOpenPopup(true)
    }

    return (
        <div className={styles.container}>
            <Card className={`shadow-lg ${styles.card}`}>
                {openPopup ? <CorrectSignUpPopup /> : (
                    <>
                        <CardHeader>
                            <CardTitle>{t('signin.text')}</CardTitle>
                        </CardHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <CardContent>
                                    <FormField
                                        control={form.control}
                                        name='email'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('form.email.label')}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder={t('form.email.placeholder')} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name='password'
                                        render={({ field }) => (
                                            <FormItem className='mt-3'>
                                                <FormLabel>{t('form.password.label')}</FormLabel>
                                                <FormControl>
                                                    <Input type={t('form.password.placeholder')} {...field} />
                                                </FormControl>
                                                <FormDescription>
                                                    {t('form.password.helperText')}
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>
                                <CardFooter>
                                    <Button>{t('signin.text')}</Button>
                                </CardFooter>
                            </form>
                        </Form>
                    </>
                )}
            </Card>
        </div>
    )
}