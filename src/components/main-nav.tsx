"use client"

import * as React from "react"
import Link from "next/link"

import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { ContactSheet } from "@/components/contact-sheet"
import { ContributeSheet } from "@/components/contribute-sheet"


export function MainNav() {
    return (
        <>
            <div className="hidden md:flex h-[52px] items-center justify-center">
                <Link href="/" className="inline-flex items-center py-1 text-sm font-medium mr-8">
                    <div className="dark:hidden"><Image src="/spacehunt-logo-black-1.png" height={16} width={16} alt="Spacehunt Logo black" /></div>
                    <div className="hidden dark:block"><Image src="/spacehunt-logo-white-1.png" height={16} width={16} alt="Spacehunt Logo white" /></div>
                    <div data-orientation="vertical" role="none" className="shrink-0 bg-border w-[1px] mx-2 h-4"></div>
                    <span className="inline">spacehunt.io</span>
                </Link>
                <Separator orientation="vertical" />
                <NavigationMenu className="pl-4">
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <ContributeSheet />
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                <ContactSheet />
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="https://twitter.com/gpiechnik2" legacyBehavior passHref>
                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                    <svg className="h-4 w-4" fill="white" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" /></svg>
                                    <p className="pl-1">Twitter</p>
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </>
    )
}
