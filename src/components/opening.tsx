"use client"

import * as React from "react"
import { NewsletterForm } from "@/components/newsletter-form"


interface OpeningProps {
  setIsSubscribedProp: (value: boolean) => void;
}

export function Opening({ setIsSubscribedProp }: OpeningProps) {
  return (
    <>
      <div className="grd">
        <div className="openingbg"></div>
      </div>
      <div className="flex min-h-screen flex-col items-center justify-between">
        <div className="max-w-[1280px] w-full space-y-4 px-8 sm:px-20 xl:px-0 pb-20 pt-32 sm:pt-40 xl:pt-72">
          <h1 className="max-w-[600px] font-regular text-5xl sm:text-6xl md:text-7xl leading-tight">
            Hunt space for your new product
          </h1>
          <p className="max-w-[400px] text-l text-muted-foreground pt-2">
            A curated open-source list of places where you can promote your products, both paid and free.
          </p>
          <div className="pt-2">
            <NewsletterForm setIsSubscribedProp={setIsSubscribedProp} />
          </div>
        </div>
      </div>
    </>
  )
}
