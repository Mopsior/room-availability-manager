import { doc, updateDoc } from "firebase/firestore";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@shadcn/dialog"
import { Button } from "@shadcn/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@shadcn/form";
import { useToast } from "@/hooks/use-toast";
import { db } from "@fb";
import { Input } from "@shadcn/input";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { catchError } from "@/utils/catch-error";

const formSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
})

export const UpdateDialog = ({ id, name, description }: { id: string, name: string, description: string }) => {
    const t = useTranslations('components.UpdateDialog')
    const uniT = useTranslations('universal')
    const { toast } = useToast()
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!values.name) values.name = name
        if (!values.description) values.description = description
        const [error] = await catchError(updateDoc(doc(db, 'rooms', id), {
                name: values.name,
                description: values.description,
            }))
        
        if (error) {
            console.error(error)
            return toast({
                title: t('toast.error.title'),
                description: t('toast.error.description'),
                variant: 'destructive'
            })
        }

        form.reset()
        toast({
            title: t('toast.success')
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={'outline'} className='mr-2 mt-2'>{uniT('edit')}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{t('edit')}</DialogTitle>
                    <DialogDescription>{t('editDescription')}</DialogDescription>
                </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('form.name')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('form.namePlaceholder')} defaultValue={name} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                            <FormField
                                control={form.control}
                                name='description'
                                render={({ field }) => (
                                    <FormItem className="mt-3">
                                        <FormLabel>{t('form.description')}</FormLabel>
                                        <FormControl>
                                            <Input placeholder={t('form.descriptionPlaceholder')} defaultValue={description} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                            <DialogFooter className="mt-6">
                                <Button type="submit">{uniT('save')}</Button>
                            </DialogFooter>
                        </form>
                    </Form>
            </DialogContent>
        </Dialog>
    )
}