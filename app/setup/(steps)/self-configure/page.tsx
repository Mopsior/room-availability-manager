'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArticleToggle } from "@/features/setup/components/article-toggle";
import { FirebaseAuthArticle, FirestoreRulesArticle, TranslationArticle } from "@/features/setup/components/articles-content";
import { SetupSteps } from "@/features/setup/components/setup-steps";
import { Fingerprint, Languages, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SelfConfigurationPage() {
    const [ pressed, setPressed ] = useState<'auth' | 'rules' | 'translation'>('auth')
    const [ timeToGoForward, setTimeToGoForward ] = useState(3)
    const [ isOpen, setIsOpen ] = useState(false)
    const router = useRouter()

    const handleClick = () => {
        router.push('/setup/register')
    }

    const handleOpen = () => {
        setTimeToGoForward(3)
        let count = 3
        if (!isOpen) {
            const timer = setInterval(() => {
                if (count === 0) {
                    clearInterval(timer);
                    return;
                }
                console.log(timeToGoForward, count)
                setTimeToGoForward((prevCount) => prevCount - 1);
                count--
            }, 1000);
        }
        setIsOpen(!isOpen)
    }

    return (
        <>
            <SetupSteps
                selected={[true, true, false]}
                checked={[true, false, false]} />
            <section className="mt-10 mb-7 w-full mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>What you need to do?</CardTitle>
                        <CardDescription>Before publishing app to production, you need to do these steps.
                            We&apos;ve configured your firestore hierarchy automaticly and verified firebase setup</CardDescription>
                    </CardHeader>
                    <CardContent className={`flex flex-wrap flex-col md:flex-row md:flex-nowrap gap-5`}>
                        <div className={`flex gap-3 flex-col md:min-w-[300px] w-fit`}>
                            <ArticleToggle
                                index={'auth'}
                                pressed={pressed}
                                onPress={() => setPressed('auth')}>
                                <Fingerprint className="text-gray-500 mr-2" />
                                Setup firebase auth
                            </ArticleToggle>
                            <ArticleToggle
                                index={'rules'}
                                pressed={pressed}
                                onPress={() => setPressed('rules')}>
                                <ShieldAlert className="text-gray-500 mr-2" />
                                Add Firestore security rules
                            </ArticleToggle>
                            <ArticleToggle
                                index={'translation'}
                                pressed={pressed}
                                onPress={() => setPressed('translation')}>
                                <Languages className="text-gray-500 mr-2" />
                                Configure translation
                            </ArticleToggle>
                        </div>
                        <article className={`text-pretty ${pressed === 'rules' && "mx-[-24px] md:ml-0"}`}>
                            {pressed === 'auth' && <FirebaseAuthArticle /> }
                            {pressed === 'rules' && <FirestoreRulesArticle /> }
                            {pressed === 'translation' && <TranslationArticle />}
                        </article>
                    </CardContent>
                    <CardFooter className="justify-end">
                        <AlertDialog onOpenChange={() => handleOpen()}>
                            <AlertDialogTrigger asChild>
                                <Button>I&apos;ve configured everything</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Did you configured everything?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Make it sure you configured everything, to avoid any issues in the future.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction asChild>
                                        <Button onClick={() => handleClick()} disabled={timeToGoForward != 0}>Continue {timeToGoForward != 0 && `(${timeToGoForward}s)`}</Button>
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </CardFooter>
                </Card>
            </section>
        </>
    )
}