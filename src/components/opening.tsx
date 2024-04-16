"use client"

import * as React from "react"
import { gsap } from "gsap";

import { NewsletterForm } from "@/components/newsletter-form"


interface OpeningProps {
  setIsSubscribedProp: (value: boolean) => void;
}

export function Opening({ setIsSubscribedProp }: OpeningProps) {
  React.useEffect(() => {
    gsap.timeline()
      .fromTo("#opening", {
        duration: 1.2,
        y: 10,
        opacity: 0
      }, {
        duration: 1.2,
        y: 0,
        opacity: 1
      })
  }, [])

  return (
    <>
      <div className="grd">
        <div className="openingbg"></div>
      </div>
      <div className="flex min-h-screen flex-col items-center justify-between" id="opening">
        <div className="max-w-[1280px] w-full space-y-4 px-8 sm:px-20 xl:px-0 pb-20 pt-[40%] sm:pt-[18%] xl:pt-[13%]">
          <div className="w-max">
            <a href="https://www.producthunt.com/products/spacehunt-2?utm_source=badge-follow&utm_medium=badge&utm_souce=badge-spacehunt&#0045;2" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/follow.svg?product_id=575782&theme=dark" alt="Spacehunt - Curated&#0044;&#0032;open&#0045;source&#0032;list&#0032;for&#0032;your&#0032;startups&#0032;promotion | Product Hunt" className="width: 200px; height: 54px;" width="200" height="54" /></a>
          </div>
          <h1 className="max-w-[600px] font-regular text-5xl sm:text-6xl md:text-7xl leading-tight pt-2 font-grd">
            Hunt space for your new product
          </h1>
          <p className="max-w-[400px] text-l text-muted-foreground pt-2">
            A curated open-source list of places where you can promote your products, both paid and free.
          </p>
          <div className="pt-2">
            <NewsletterForm setIsSubscribedProp={setIsSubscribedProp} actionButtonText="Subscribe" />
          </div>
        </div>
      </div>
    </>
  )
}
