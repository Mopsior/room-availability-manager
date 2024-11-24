import { ReactNode } from "react";

export const InlineCode = ({ children, variant = 'default' }: { children: ReactNode, variant?: 'default' | 'lighter' }) => {
    return (
        <code
            className={`${variant === 'default' && "bg-accent"}
                ${variant === 'lighter' && "bg-accent/80"}
                px-2 py-1 rounded`}>
                {children}
            </code>
    )
}