"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "sonner"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui//input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"


const FormSchema = z.object({
    message: z
        .string()
        .min(10, {
            message: "Message must be at least 10 characters.",
        })
        .max(300, {
            message: "Message must not be longer than 300 characters.",
        }),
    email: z.string()
        .min(5, {
            message: "Email must be at least 5 characters.",
        })
        .email("This is not a valid email.")
})

export function ContactSheet() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.email,
                    message: data.message
                }),
            });

            if (!response.ok) throw new Error('There was a problem sending your contact message. Please try writing directly to contact@spacehunt.io. We apologize for the inconvenience!')

            toast.success("Your contact message has been sent!")
        } catch (error) {
            toast.error("There was a problem sending your contact message. Please try writing directly to contact@spacehunt.io. We apologize for the inconvenience!")
        }
    }

    return (
        <Sheet>
            <SheetTrigger>Contact</SheetTrigger>
            <SheetContent side="left">
                <SheetHeader className="pb-10">
                    <SheetTitle className="pt-4">Contact Us</SheetTitle>
                    <SheetDescription>
                        If you want to be featured or just want to write, use the form at
                        the bottom or write directly to&nbsp;&#8203;
                        <a
                            href="mailto:contact@spacehunt.io"
                            className="font-medium text-primary underline underline-offset-4"
                        >
                            contact@spacehunt.io
                        </a>
                        .
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="jerry@spacehunt.io" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Message</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="How is your day going?"
                                            className="h-40"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        We'll get back to you as soon as we read your message.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>

    )
}
