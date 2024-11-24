'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CorrectSignUpPopup } from "@/components/correct-signup-popup";
import { AdminAccountRegister } from "@/features/setup/actions/register";
import { SetupSteps } from "@/features/setup/components/setup-steps";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { catchError } from "@/utils/catch-error";

export default function AdminAccountRegisterPage() {
    const [success, setSuccess] = useState(false)
    const { toast } = useToast()

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const [error] = await catchError(AdminAccountRegister(values.email, values.password))
        if (error) {
            console.error(error)
            toast({
                variant: 'destructive',
                title: 'Error',
                description: error.message
            })
            return
        }
        setSuccess(true)
    }

    const formSchema = z.object({
        email: z.string().email({ message: 'Invalid email adress' }),
        password: z.string()
            .min(6, { message: 'Password must be at least 6 characters' })
            .max(4096, { message: 'Password must be at most 4096 characters' })
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
                if (countOfLowerCase < 1) message = 'Password must contain at least one lowercase letter'
                if (countOfUpperCase < 1) message = 'Password must contain at least one uppercase letter'
                if (countOfNumbers < 1) message = 'Password must contain at least one number'
                if (countOfSpecialChar < 1) message = 'Password must contain at least one special character'

                if (message) {
                    ctx.addIssue({
                        code: "custom",
                        message: message.toString(),
                    })
                }
            })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })


    return (
        <>
            <SetupSteps
                selected={[true, true, true]}
                checked={[true, true, success]} />
            <Card
                className={`mt-10 w-full mx-auto ${success && "w-fit px-16"}`}
                >
                {success ? (<>
                    <CorrectSignUpPopup buttonText="Log in" className="whitespace-nowrap">Your app is ready!</CorrectSignUpPopup>
                </>) : (<>
                <CardHeader>
                    <CardTitle>Create first admin account</CardTitle>
                    <CardDescription>Now you&apos;ll setup your first admin account.</CardDescription>
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
                                            <Input {...field} />
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
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            Password must contain at least 6 characters, one uppercase letter, one lowercase letter, one number and one special character
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                        </CardContent>
                        <CardFooter>
                            <Button>Create Account</Button>
                        </CardFooter>
                    </form>
                </Form>
                </>)}
            </Card>
        </>
    )
}