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

const formSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
})

export const UpdateDialog = ({ id, name, description }: { id: string, name: string, description: string }) => {
    const { toast } = useToast()
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        if (!values.name) values.name = name
        if (!values.description) values.description = description
        try {
            await updateDoc(doc(db, 'rooms', id), {
                name: values.name,
                description: values.description,
            })
            
            form.reset()

            toast({
                title: 'Pokój został zaktualizowany'
            })
        }
        catch (err) {
            console.error(err)
            toast({
                title: 'Wystąpił błąd',
                description: 'Nie udało się zaktualizować pokoju. Zobacz konsolę',
                variant: 'destructive'
            })
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant={'outline'} className='mr-2 mt-2'>Edytuj</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edytuj pokój</DialogTitle>
                    <DialogDescription>Edytuj dane pokoju</DialogDescription>
                </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name='name'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nazwa pokoju</FormLabel>
                                        <FormControl>
                                            <Input placeholder='ex. 101' defaultValue={name} {...field} />
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
                                        <FormLabel>Opis pokoju</FormLabel>
                                        <FormControl>
                                            <Input placeholder='ex. Meeting Room' defaultValue={description} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                            <DialogFooter className="mt-6">
                                <Button type="submit">Zapisz</Button>
                            </DialogFooter>
                        </form>
                    </Form>
            </DialogContent>
        </Dialog>
    )
}