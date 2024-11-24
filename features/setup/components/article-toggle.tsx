import * as Toggle from '@radix-ui/react-toggle'
import { ReactNode } from "react"

export const ArticleToggle = ({index, pressed, onPress, children}: {index: string, pressed: string, onPress: Function, children: ReactNode}) => {
    return (
        <Toggle.Root
            className={`px-4 py-2 text-center hover:bg-gray-100 rounded-sm text-base transition flex ${pressed === index && "bg-gray-200 hover:bg-gray-200"}`}
            onPressedChange={() => onPress(index)}>
            {children}
        </Toggle.Root>
    )
}