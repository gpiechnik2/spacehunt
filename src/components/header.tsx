"use client"

import * as React from "react"
import { gsap } from "gsap"

import { MobileNav } from "@/components/mobile-nav"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { GetAccessDialog } from "@/components/get-access-dialog"

interface HeaderProps {
    setIsSubscribedProp: (value: boolean) => void;
}

export function Header({ setIsSubscribedProp }: HeaderProps) {
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            setIsScrolled(offset > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    React.useEffect(() => {
        gsap.timeline()
            .fromTo("#header", {
                duration: 0.8,
                y: -10,
                opacity: 0
            }, {
                duration: 1.6,
                y: 0,
                opacity: 1
            })
    }, [])

    return (
        <header className={`z-50 sticky top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${isScrolled ? 'border-b border-border/40' : ''}`} id="header">
            <div className="container flex h-14 max-w-[1280px] items-center pl-8 pr-8 xl:pl-0 xl:pr-0">
                <MobileNav />
                <MainNav />
                <div className="flex flex-1 justify-end space-x-2">
                    {/* <ModeToggle /> */}
                    <GetAccessDialog setIsSubscribedProp={setIsSubscribedProp}>
                        <Button variant="outline">Get Access</Button>
                    </GetAccessDialog>
                </div>
            </div>
        </header>
    )
}
