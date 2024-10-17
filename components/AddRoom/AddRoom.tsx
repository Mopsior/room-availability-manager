'use client'
import Image from 'next/image'
import plusIcon from '@/imgs/plus-icon.svg'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader } from '../ui/card'
  

export const AddRoom = () => {
    return (
        <>
        <Dialog>
            <DialogTrigger asChild>
                <Card>
                    <CardHeader>
                        <Image 
                            src={plusIcon}
                            alt='Plus icon'
                            width={60}
                            height={60}
                            />
                    </CardHeader>
                    <CardContent>
                        Dodaj Pokój
                    </CardContent>
                </Card>
                {/* <div className={styles.block}>
                    <Image 
                        src={plusIcon}
                        style={{ fill: 'white'}}
                        alt='Plus icon'
                        width={30}
                        height={30}
                        />
                    <p>Dodaj pokój</p>
                </div> */}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                    This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
        </>
    )
}