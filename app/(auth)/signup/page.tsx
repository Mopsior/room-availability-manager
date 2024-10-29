'use client'

import { createAccount } from '@/utils/firebase/auth'
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

export default function SignUp() {
    const t = useTranslations('auth')

    const formSchema = z.object({
        email: z.string().email({ message: t('form.schemaMessage.email') }),
        password: z.string().min(6, { message: t('form.schemaMessage.password') })
    })

    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await createAccount(values.email, values.password)
        } catch (err: any) {
            const { title, description, action } = handleSignUpError(err, t)
            toast({
                variant: 'destructive',
                title: title,
                description: description,
                action: action ? <Button variant={'outline'} className='bg-transparent' onClick={() => { router.push('/login') }}>{t('login.text')}</Button> : undefined
            })
        }
    }

    return (
        <div className={styles.container}>
            <Card className={`shadow-lg ${styles.card}`}>
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
            </Card>
        </div>
    )
}