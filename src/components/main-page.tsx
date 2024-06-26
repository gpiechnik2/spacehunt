"use client"

import * as React from "react"

import { Opening } from "@/components/opening"
import { Pages } from "@/components/pages"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"


export function MainPage() {
    const [isSubscribed, setIsSubscribed] = React.useState(false);

    React.useEffect(() => {
        const isSubscribed = localStorage.getItem('isSubscribed') === 'true';
        setIsSubscribed(isSubscribed);
    }, []);

    return (
        <>
            <Header setIsSubscribedProp={setIsSubscribed} />
            <Opening setIsSubscribedProp={setIsSubscribed} />
            <Pages setIsSubscribedProp={setIsSubscribed} isSubscribedProp={isSubscribed} />
            <Footer />
        </>
    )
}
