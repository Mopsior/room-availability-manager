'use client'

import { logIn } from '@/utils/firebase/auth'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
    email: string,
    password: string
}

export default function LogIn() {
    const {register, handleSubmit, formState: { errors }} = useForm<Inputs>()
    const onSubmit:SubmitHandler<Inputs> = async data => {
        console.log(data)
        const user = await logIn(data.email, data.password)
        console.log(2, user)
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email" placeholder="abc@test.com" {...register("email", { required: true })} />
                { errors.email && <span>This field is required</span> }
                <input type="password" {...register('password', { required: true })} />
                { errors.password && <span>This field is required</span> }
                <button type="submit">Log in</button>
            </form>
        </>
    )
}
