"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { SquareArrowOutUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Page, ProductType } from "@/lib/types"


function getProductTypeBadge(productType: ProductType) {
    switch (productType) {
        case "free":
            return <Badge className="mb-2" variant="outline">{productType}</Badge>
        case "paid":
            return <Badge className="mb-2">{productType}</Badge>
        case "both":
            return (
                <>
                    <Badge className="mb-2">paid</Badge>
                    <Badge className="mb-2 ml-1" variant="outline">free</Badge>
                </>
            )
        default:
            return null
    }
}

function getCategoryBadgeVariant(index: number) {
    if (index % 2) {
        return "default"
    } else {
        return "secondary"
    }
}

function getDomainAuthority(domainAuthority: number) {
    if (domainAuthority <= 40) {
        return <a className="text-red-700">Below Average</a>
    } else if (domainAuthority <= 50) {
        return <a className="text-yellow-400">Average</a>
    } else if (domainAuthority <= 60) {
        return <a className="text-green-700">Good</a>
    } else {
        return <a className="text-green-500">Excellent</a>
    }

}

export function PageCard({
    name = "Spacehunt",
    description = "A website that allows posting and searching for pages to promote a product.",
    logoUrl = "/huntspace-logo-white.png",
    previewUrl = "/huntspace-logo-white.png",
    domainAuthority = 98,
    productType = "free",
    link = "https://spacehunt.io",
    categories = ["marketing", "social"],
    addedBy = "Spacehunt"
}: Page) {

    return (
        <Sheet>
            <SheetTrigger className="text-left w-full">
                <Card className="h-full transition-all hover:bg-accent">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {getProductTypeBadge(productType)}
                            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                                {name}
                            </h4>
                        </CardTitle>
                        <CardDescription className="space-x-4 rounded-md border">
                            <Image className="rounded-md border" src={logoUrl} height={50} width={50} alt={name + "logo"} />
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                        {description}
                        <div className="pt-3">
                            {categories.map((category, index) => (
                                <Badge className="mb-2 mr-1" variant={getCategoryBadgeVariant(index)}>{category}</Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </SheetTrigger>
            <SheetContent className="w-[300px] sm:w-[500px] lg:max-w-2xl" side="right">
                <SheetHeader className="pb-10">
                    <SheetTitle className="pt-8">
                        <AspectRatio ratio={16 / 9} className="bg-muted space-x-4 rounded-md border p-4">
                            <Image
                                src={previewUrl}
                                alt={name + "preview"}
                                fill
                                className="rounded-md object-cover"
                            />
                        </AspectRatio>
                        <div className="flex flex-row items-start justify-between space-y-0 pb-2 pt-4 text-left">
                            <div>
                                {getProductTypeBadge(productType)}
                                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                    {name}
                                </h3>
                            </div>
                            <div className="space-x-4 rounded-md border">
                                <Image className="rounded-md border" src={logoUrl} height={50} width={50} alt={name + "logo"} />
                            </div>
                        </div>
                    </SheetTitle>
                    <SheetDescription className="text-left">
                        <p className="leading-6 [&:not(:first-child)]:mt-4 lg:w-[400px]">
                            {description}
                        </p>

                        <p className="leading-7 [&:not(:first-child)]:mt-4">
                            Domain Authority:&nbsp;&#8203;
                            <a
                                className="font-medium text-primary"
                            >
                                {domainAuthority}
                            </a>
                            &nbsp;&#8203;({getDomainAuthority(domainAuthority)})
                        </p>

                        <p className="leading-7">
                            Reported by:&nbsp;&#8203;
                            <a
                                className="font-medium text-primary"
                            >
                                {addedBy}
                            </a>
                            &nbsp;&#8203;
                        </p>

                        <p className="leading-7">
                            Website Address:&nbsp;&#8203;
                            
                            <a href={link} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer-when-downgrade" className="font-medium text-primary">
                            {link}
                            </a>
                            &nbsp;&#8203;
                        </p>

                        <div className="pt-4">
                            {categories.map((category, index) => (
                                <Badge className="mb-2 mr-1" variant={getCategoryBadgeVariant(index)}>{category}</Badge>
                            ))}
                        </div>
                        <div className="flex justify-end pt-4">
                            <a href={link} target="_blank" rel="noopener noreferrer" referrerPolicy="no-referrer-when-downgrade">
                                <Button>
                                    <SquareArrowOutUpRight className="mr-2 h-4 w-4" /> Visit Website
                                </Button>
                            </a>
                        </div>
                    </SheetDescription>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}
