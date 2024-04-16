"use client"

import * as React from "react"
import InfiniteScroll from 'react-infinite-scroll-component';
import { MousePointerClick } from "lucide-react";

import { PageCard } from "@/components/page-card"
import { GetAccessDialog } from "@/components/get-access-dialog";
import { Button } from "@/components/ui/button";
import { TypeFilterCombobox } from "@/components/type-filter-combobox";
import { Page } from "@/lib/types"


interface PagesProps {
    isSubscribedProp: boolean
    setIsSubscribedProp: (value: boolean) => void;
}

export function Pages({ isSubscribedProp, setIsSubscribedProp }: PagesProps) {
    const [type, setType] = React.useState("")
    const [data, setData] = React.useState<Page[]>([]);
    const [page, setPage] = React.useState(1);
    const [hasMore, setHasMore] = React.useState(true);

    const [totalResults, setTotalResults] = React.useState("")
    const [totalResultsFree, setTotalResultsFree] = React.useState("")
    const [totalResultsPaid, setTotalResultsPaid] = React.useState("")

    const fetchData = async () => {
        const res = await fetch(`/api/pages?page=${page}`);
        const newData = await res.json();

        if (newData.data.length === 0) {
            setHasMore(false);
        } else {
            setData(prevData => {
                const newDataUnique = newData.data.filter((newItem: Page) =>
                    !prevData.some(item => item.name === newItem.name)
                );
                return [...prevData, ...newDataUnique];
            });
        }
    }

    const fetchTotalResults = async () => {
        const res = await fetch("/api/total-pages");
        const totalResults = await res.json();

        setTotalResults(totalResults.totalResults)
        setTotalResultsFree(totalResults.totalResultsFree)
        setTotalResultsPaid(totalResults.totalResultsPaid)
    }

    React.useEffect(() => {
        fetchData();
    }, [page]);

    React.useEffect(() => {
        fetchTotalResults();
    }, [totalResults]);

    return (
        <main className="flex flex-col items-center justify-between">
            <div className="max-w-[1280px] justify-between space-y-4">
                <div className="space-y-4 ">
                    {data.length >= 1 ?
                        <div className="container flex h-14 max-w-[1280px] items-end pl-8 pr-8 xl:pl-0 xl:pr-0">
                            <TypeFilterCombobox setTypeProp={setType} />
                            <div className="flex flex-1 justify-end space-x-2">
                                <p className="text-xs text-muted-foreground">
                                    {!type ? totalResults: null}
                                    {type == "free" ? totalResultsFree: null}
                                    {type == "paid" ? totalResultsPaid: null}
                                    &nbsp;&#8203;total results
                                </p>
                            </div>
                        </div> : null
                    }
                    <InfiniteScroll
                        dataLength={data.length}
                        next={() => setPage(page + 1)}
                        hasMore={isSubscribedProp ? hasMore : false}
                        loader={
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="my-3 h-4 w-4 animate-spin mb-4 w-full"
                            >
                                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                        }
                        style={{ overflowY: 'hidden' }}
                        scrollThreshold={0.7}
                    >
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 px-8 xl:px-0">
                            {data.filter(item => type === "" || item.productType === type).map((item, index) => (
                                <PageCard
                                    name={item.name}
                                    description={item.description}
                                    logoUrl={item.logoUrl}
                                    previewUrl={item.previewUrl}
                                    domainAuthority={item.domainAuthority}
                                    productType={item.productType}
                                    link={item.link}
                                    categories={item.categories}
                                    addedBy={item.addedBy}
                                />
                            ))}
                        </div>
                    </InfiniteScroll>
                    <div>
                        {!isSubscribedProp ? (
                            <div className="flex justify-center items-center pt-12">
                                <GetAccessDialog setIsSubscribedProp={setIsSubscribedProp}>
                                    <Button>
                                        <MousePointerClick className="mr-2 h-4 w-4" />Load more
                                    </Button>
                                </GetAccessDialog>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </main>
    )
}
