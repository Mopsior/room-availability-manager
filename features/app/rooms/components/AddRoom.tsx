'use client'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@shadcn/dialog"
import { Button } from '@shadcn/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shadcn/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@shadcn/input"
import { addDoc, collection } from "firebase/firestore"
import { db } from "@fb"
import { useToast } from "@/hooks/use-toast"
import { useTranslations } from "next-intl"

const formSchema = z.object({
    name: z.string({ message: 'Nazwa pokoju nie może być pusta' }),
    description: z.string({ message: 'Opis pokoju nie może być pusty' }),
})

export const AddRoom = () => {
    const { toast } = useToast()
    const t = useTranslations('components.AddRoom')
    const uniT = useTranslations('universal')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await addDoc(collection(db, 'rooms'), {
                name: values.name,
                description: values.description,
                last_edit: new Date(),
                full: false
            })

            form.reset()

            toast({
                title: t('toast.success')
            })
        } catch (err) {
            toast({
                title: t('toast.error.title'),
                description: t('toast.error.description'),
                variant: 'destructive'
            })
            console.error(err)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
               <Button className="mt-4" variant={'outline'}>{t('dialog.button')}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('dialog.title')}</DialogTitle>
                    <DialogDescription>{t('dialog.description')}</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <DialogDescription asChild>
                            <>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem className="mt-1">
                                        <FormLabel>{t('form.name.label')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('form.name.placeholder')} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field }) => (
                                    <FormItem className="mt-4">
                                        <FormLabel>{t('form.description.label')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('form.description.placeholder')} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </>
                        </DialogDescription>
                        <DialogClose>
                            <Button type="submit" className="mt-4">{uniT('add')}</Button>
                        </DialogClose>
                    </form> 
                </Form>
            </DialogContent>
        </Dialog>
    )
}