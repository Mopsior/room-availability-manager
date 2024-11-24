import { ReactNode } from "react"

export const Callout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="relative">
            <div className="text-pretty py-3 pl-4 pr-4 mt-2 mb-2 bg-primary/20 rounded-r after:w-[2px] after:content[''] after:bg-primary after:absolute after:left-0 after:top-0 after:h-full block">
                {children}
            </div>
        </div>
    )
}