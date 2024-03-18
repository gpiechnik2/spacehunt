"use client"

import * as React from "react"
import { MobileNav } from "@/components/mobile-nav"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { GetAccessDialog } from "@/components/get-access-dialog"

interface HeaderProps {
    setIsSubscribedProp: (value: boolean) => void;
}

export function Header({ setIsSubscribedProp }: HeaderProps) {
    return (
        <header className="z-50 sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-border/40">
            <div className="container flex h-14 max-w-[1280px] items-center pl-8 pr-8 xl:pl-0 xl:pr-0">
                <MobileNav />
                <MainNav />
                <div className="flex flex-1 justify-end space-x-2">
                    {/* <ModeToggle /> */}
                    <GetAccessDialog setIsSubscribedProp={setIsSubscribedProp}>
                        <Button variant="outline">Sign Up for the Waitlist</Button>
                    </GetAccessDialog>
                </div>
            </div>
        </header>
    )
}
