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
    adder: z
        .string()
        .min(1, {
            message: "The name of the person adding must have at least one character.",
        })
        .max(30, {
            message: "The name of the person adding must have a maximum of 30 characters.",
        }),
    name: z
        .string()
        .min(1, {
            message: "The page name must have at least 3 characters.",
        })
        .max(50, {
            message: "The page name must have a maximum of 50 characters.",
        }),
    link: z
        .string()
        .url()
        .min(1, {
            message: "The link must have at least 3 characters.",
        })
        .max(60, {
            message: "The link must have a maximum of 60 characters.",
        }),
    description: z
        .string()
        .min(10, {
            message: "Description must be at least 10 characters.",
        })
        .max(300, {
            message: "Description must not be longer than 300 characters.",
        }),
})

export function ContributeSheet() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const response = await fetch('/api/contribute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    adder: data.adder,
                    name: data.name,
                    link: data.link,
                    description: data.description
                }),
            });

            if (!response.ok) throw new Error('There was an issue submitting your contribution. We will fix the error as quickly as possible.')

            toast.success("Your contribution has been submitted. Thank you for your support!")
        } catch (error) {
            toast.error("There was an issue submitting your contribution. We will fix the error as quickly as possible.")
        }
    }

    return (
        <Sheet>
            <SheetTrigger>Contribute</SheetTrigger>
            <SheetContent side="left">
                <SheetHeader className="pb-10">
                    <SheetTitle className="pt-4">Contribute</SheetTitle>
                    <SheetDescription>
                        If you want to add your own or someone else's page, add it via a
                        pull request on&nbsp;&#8203;
                        <a
                            href="https://github.com"
                            className="font-medium text-primary underline underline-offset-4"
                        >
                            Github
                        </a>
                        &nbsp;&#8203;or use the form below.
                    </SheetDescription>
                </SheetHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="adder"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Your name, nickname, or company name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Jerry" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>The name of the page or product</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Spacehunt" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="link"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Link to the page or product</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://spacehunt.io" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="A website that allows posting and searching for pages to promote a product."
                                            className="h-30"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        The page will be added as soon as it is reviewed.
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
