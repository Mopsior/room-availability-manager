'use client'

import { createAccount } from '@/utils/firebase/auth'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
    email: string,
    password: string
}

export default function SignUp() {
    const {register, handleSubmit, formState: { errors }} = useForm<Inputs>()
    const onSubmit:SubmitHandler<Inputs> = data => {
        console.log(data)
        createAccount(data.email, data.password)
    }
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input type="email" placeholder="abc@test.com" {...register("email", { required: true })} />
                { errors.email && <span>This field is required</span> }
                <input type="password" {...register('password', { required: true })} />
                { errors.password && <span>This field is required</span> }
                <button type="submit">Sign In</button>
            </form>
        </>
    )
}
