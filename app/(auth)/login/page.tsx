'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import styles from '@/styles/app/auth/styles.module.css'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@shadcn/form'
import { Input } from '@shadcn/input'
import { Button } from '@shadcn/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@shadcn/card'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { handleLoginError } from '@/utils/firebase/handleAuthError'
import { logIn } from '@/utils/firebase/auth'

const formSchema = z.object({
    email: z.string().email({ message: 'Niepoprawny adres e-mail' }),
    password: z.string().min(6, { message: 'Hasło musi mieć co najmniej 6 znaków' })
})

export default function LogIn() {
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await logIn(values.email, values.password)
        } catch (err: any) {
            const { title, description, action } = handleLoginError(err)
            toast({
                variant: 'destructive',
                title: title,
                description: description,
                action: action ? <Button variant={'outline'} className='bg-transparent' onClick={() => { router.push(action) }}>Zaloguj się</Button> : undefined
            })
        }
    }

    return (
        <div className={styles.container}>
            <Card className={`shadow-lg ${styles.card}`}>
                <CardHeader>
                    <CardTitle>Zaloguj się</CardTitle>
                </CardHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <CardContent>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>E-mail</FormLabel>
                                        <FormControl>
                                            <Input placeholder='test@example.com' {...field} />
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
                                        <FormLabel>Hasło</FormLabel>
                                        <FormControl>
                                            <Input type='password' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} 
                                />
                        </CardContent>
                        <CardFooter>
                            <Button>Zaloguj się</Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    )
}