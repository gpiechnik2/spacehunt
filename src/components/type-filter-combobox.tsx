"use client"

import * as React from "react"
import { Coins } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Type, types } from "@/lib/types"
import { useMediaQuery } from "@/hooks/use-media-query"


interface TypeFilterComboboxProps {
    setTypeProp: (value: string) => void;
}

export function TypeFilterCombobox({ setTypeProp }: TypeFilterComboboxProps) {
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [open, setOpen] = React.useState(false)
    const [selectedType, setSelectedType] = React.useState<Type | null>(
        null
    )

    if (isDesktop) {
        return (
            <div className="flex items-center space-x-4" >
                <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[150px] justify-start">
                            {selectedType ? <>{selectedType.label}</> : <><Coins className="mr-2 h-4 w-4" /> Set type</>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0" align="start">
                        <TypeList setOpenProp={setOpen} setSelectedTypeProp={setSelectedType} setTypeProp={setTypeProp} />
                    </PopoverContent>
                </Popover>
            </div>
        )
    }

    return (
        <div className="flex items-center space-x-4" >
            <Drawer open={open} onOpenChange={setOpen}>
                <DrawerTrigger asChild>
                    <Button variant="outline" className="w-[150px] justify-start">
                        {selectedType ? <>{selectedType.label}</> : <><Coins className="mr-2 h-4 w-4" /> Set type</>}
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <div className="mt-4 border-t">
                        <TypeList setOpenProp={setOpen} setSelectedTypeProp={setSelectedType} setTypeProp={setTypeProp} />
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    )
}

function TypeList({
    setOpenProp,
    setSelectedTypeProp,
    setTypeProp
}: {
    setOpenProp: (open: boolean) => void
    setSelectedTypeProp: (status: Type | null) => void
    setTypeProp: (value: string) => void;
}) {
    return (
        <Command>
            <CommandInput placeholder="Change type..." />
            <CommandList >
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup >
                    {types.map((type) => (
                        <CommandItem
                            key={type.value}
                            value={type.value}
                            onSelect={(value) => {
                                setSelectedTypeProp(
                                    types.find((priority) => priority.value === value) ||
                                    null
                                )
                                setTypeProp(
                                    types.find((priority) => priority.value === value)?.value ||
                                    ""
                                )
                                setOpenProp(false)
                            }}
                        >
                            {type.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    )
}
