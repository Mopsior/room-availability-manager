import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { catchError } from "@/utils/catch-error"
import { useState } from "react"
import { CodeBlock } from "react-code-block"
import { ClassNameValue } from "tailwind-merge"

export const Code = ({ code, words, className }: { code: string, words?: Array<string>, className?: ClassNameValue }) => {
    const [copied, setCopied] = useState(false)

    const copy = async () => {
        const [error] = await catchError(navigator.clipboard.writeText(code))
        
        if (error) {
            console.error(error)
            return toast({
                title: 'Code canno\t be copied',
                description: 'Try to copy code again, maybe it\'s a browser issue',
                variant: 'destructive'
            })
        }
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 3000);
    }

    return (
        <CodeBlock code={code} language="js" words={words}>
            <div className="relative">
                <CodeBlock.Code
                    className={`bg-gray-900 p-4 rounded-xl overflow-x-auto whitespace-pre-wrap break-all ${className}`}>
                    <div className="table-row">
                        <CodeBlock.LineNumber
                            className="table-cell pr-4 text-sm text-gray-500 text-right select-none break-keep" />
                        <CodeBlock.LineContent className="table-cell">
                            <CodeBlock.Token>
                                {({ isTokenHighlighted, children }) => (
                                    <span className={
                                        isTokenHighlighted
                                        ? 'bg-violet-500/20 rounded px-1 py-0.5'
                                        : ''
                                    }>
                                        {children}
                                    </span>
                                )}  
                            </CodeBlock.Token>
                        </CodeBlock.LineContent>
                    </div>
                </CodeBlock.Code>
                <Button
                    variant={'outline'}
                    className={`absolute top-2 right-2 ${copied && "motion-preset-confetti"}`}
                    onClick={() => copy()}>{copied ? 'Copied! 🎉' : 'Copy Code'}</Button>
            </div>
        </CodeBlock>
    )
}