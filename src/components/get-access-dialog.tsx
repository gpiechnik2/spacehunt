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
                    <DialogTitle>Sign Up for the Waitlist</DialogTitle>
                    <DialogDescription>
                        To receive information about the launch, sign up for the waitlist.
                    </DialogDescription>
                </DialogHeader>
                <NewsletterForm setIsSubscribedProp={setIsSubscribedProp}/>
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
