'use client'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { addDoc, collection } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
    name: z.string({ message: 'Nazwa pokoju nie może być pusta' }),
    description: z.string({ message: 'Opis pokoju nie może być pusty' }),
})

export const AddRoom = () => {
    const { toast } = useToast()

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
                title: 'Pokój został dodany'
            })
        } catch (err) {
            toast({
                title: 'Wystąpił błąd',
                description: 'Nie udało się dodać pokoju. Zobacz konsolę',
                variant: 'destructive'
            })
            console.error(err)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
               <Button className="mt-4" variant={'outline'}>Dodaj pokój</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="scroll-m-20 border-b pb-3 text-3xl font-semibold tracking-tight first:mt-0">Tworzenie pokoju</DialogTitle>
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
                                        <FormLabel>Pokój</FormLabel>
                                        <FormControl>
                                            <Input placeholder='ex. 101' {...field} />
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
                                        <FormLabel>Opis</FormLabel>
                                        <FormControl>
                                            <Input placeholder='Meeting room' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                                />
                            </>
                        </DialogDescription>
                        <DialogClose>
                            <Button type="submit" className="mt-4">Dodaj</Button>
                        </DialogClose>
                    </form> 
                </Form>
            </DialogContent>
        </Dialog>
    )
}