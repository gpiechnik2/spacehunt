"use client"

import { ReactNode } from 'react';

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { NewsletterForm } from '@/components/newsletter-form';

interface GetAccessDialogProps {
    setIsSubscribedProp: (value: boolean) => void;
    children?: ReactNode;
}

export function GetAccessDialog({ setIsSubscribedProp, children }: GetAccessDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader className="pb-2">
                    <DialogTitle className='pb-2'>Get full access for free</DialogTitle>
                    <DialogDescription>
                        To access all pages and load more, sign up for the newsletter. You can unsubscribe at any time.
                    </DialogDescription>
                </DialogHeader>
                <NewsletterForm setIsSubscribedProp={setIsSubscribedProp} actionButtonText="Get Access" />
                <p className="text-xs text-muted-foreground">
                    If you don't want to, check&nbsp;&#8203;
                    <a
                        href="https://github.com/gpiechnik2/spacehunt"
                        className="font-medium text-muted-foreground underline underline-offset-4"
                    >
                        GitHub
                    </a>&nbsp;&#8203;for the full list.
                </p>
                <DialogFooter className="sm:justify-start pt-2">
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
