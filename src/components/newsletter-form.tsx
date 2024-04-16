"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { CalendarIcon, CircleHelp } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { toast } from "sonner"


const FormSchema = z.object({
  email: z
    .string()
    .min(6, {
      message: "Email must be at least 6 characters.",
    })
    .email()
})

interface NewsletterFormProps {
  setIsSubscribedProp: (value: boolean) => void;
  actionButtonText: string
}

export function NewsletterForm({ setIsSubscribedProp, actionButtonText }: NewsletterFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
        }),
      });

      if (!response.ok) throw new Error('Problem with subscription')

      toast.success("You have been subscribed to the newsletter! Thanks!")
      localStorage.setItem('isSubscribed', 'true')
      setIsSubscribedProp(true)
    } catch (error) {
      toast.error("There was a problem with your subscription. Don't worry, you'll get access anyway.")
      localStorage.setItem('isSubscribed', 'true')
      setIsSubscribedProp(true)
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full max-w-sm space-x-2">
          <HoverCard>
            <HoverCardTrigger asChild>
              <CircleHelp className="h-4 w-4 mt-3 opacity-70" />
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">@spacehunt.io</h4>
                  <p className="text-sm pt-2">
                    A newsletter led by the Founder&nbsp;&#8203;
                    <a
                      href="https://twitter.com/gpiechnik2"
                      className="font-medium text-primary underline underline-offset-4"
                    >
                      @gpiechnik2
                    </a>
                    &nbsp;&#8203;named Startups Journey.
                  </p>
                  <p className="text-sm pt-2">
                    The newsletter includes protips, insights, and news about startup creation.
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">
                      ~1 newsletter per week
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Your email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          <Button type="submit">{actionButtonText}</Button>
        </form>
      </Form>
    </>
  )
}
