"use client"

import { Separator } from "@/components/ui/separator";


export function Footer() {
    return (
        <footer className="pt-40 pb-10">
            <div className="container max-w-[1280px] items-center px-8 xl:px-0">
                <Separator />
                <p className="text-sm leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground">
                    Build by&nbsp;&#8203;
                    <a
                        href="https://twitter.com/gpiechnik2"
                        className="font-medium text-muted-foreground underline underline-offset-4"
                    >
                        gpiechnik
                    </a>
                    . The code is available on&nbsp;&#8203;
                    <a
                        href="#"
                        className="font-medium text-muted-foreground underline underline-offset-4"
                    >
                        GitHub
                    </a>.
                </p>
            </div>
        </footer>
    );
}