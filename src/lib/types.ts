export type ProductType = "paid" | "free" | "both"

export interface Page {
    name: string
    description: string
    logoUrl: string
    previewUrl: string
    domainAuthority: number
    productType: ProductType
    link: string
    categories: string[]
    addedBy: string
}

export type Type = {
    value: string | undefined
    label: string
}

export const types: Type[] = [
    {
        value: "free",
        label: "Free",
    },
    {
        value: "paid",
        label: "Paid",
    },
    {
        value: undefined,
        label: "All",
    }
]
