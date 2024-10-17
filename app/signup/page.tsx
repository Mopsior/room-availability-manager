'use client'

import { createAccount } from '@/utils/firebase/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import styles from './styles.module.css'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { handleSignUpError } from '@/utils/firebase/handleAuthError'

const formSchema = z.object({
    email: z.string().email({ message: 'Niepoprawny adres e-mail' }),
    password: z.string().min(6, { message: 'Hasło musi mieć co najmniej 6 znaków' })
})

export default function SignUp() {
    const { toast } = useToast()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await createAccount(values.email, values.password)
        } catch (err: any) {
            const { title, description, action } = handleSignUpError(err)
            toast({
                variant: 'destructive',
                title: title,
                description: description,
                action: action ? <Button variant={'outline'} className='bg-transparent' onClick={() => { router.push('/login') }}>Zaloguj się</Button> : undefined
            })
        }
    }

    return (
        <div className={styles.container}>
            <Card className={`shadow-lg ${styles.card}`}>
                <CardHeader>
                    <CardTitle>Zarejesruj się</CardTitle>
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
                                                <FormDescription>
                                                    Hasło musi mieć co najmniej 6 znaków
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )} 
                                        />
                        </CardContent>
                        <CardFooter>
                            <Button>Zarejestruj się</Button>
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    )
}