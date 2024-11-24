import { BadgeCheck } from "lucide-react"
import { ReactNode } from "react"

export const Steps = ({ children }: { children: ReactNode }) => {
    return (
        <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
            { children }
        </ol>
    )
}

export const StepsElement = ({ selected, checked, number, children }: { selected?: boolean, checked?: boolean, number: number, children: ReactNode }) => {
    return (
            <li className={`flex md:text-nowrap md:w-full items-center sm:after:content after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700
            ${selected && 'text-blue-600 dark:text-blue-500'}`}>
                <StepsContent>
                    <span className="mr-1">{number}.</span>
                    { checked && <Badge />}
                    { children }
                </StepsContent>
            </li>
    )
}

export const StepsLastElement = ({ number, children, selected, checked }: { number: number, children: ReactNode, selected?: boolean, checked?: boolean }) => {
    return (
        <li className={`flex items-center md:text-nowrap ${selected && 'text-blue-600 dark:text-blue-500'}`}>
            <StepsContent last>
                <span className="mr-1">{number}.</span>
                { checked && <Badge /> }
                { children }
            </StepsContent>
        </li>
    )
}

const StepsContent = ({ children, last }: { children: ReactNode, last?: boolean }) => {
    return (
        <span className={`flex items-center ${!last && "after:content-['/']"} sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500`}>
            { children }
        </span>
    )
}

const Badge = () => {
    return (
        <>
            <BadgeCheck className="mr-1" height={16} />
        </>
    )
}