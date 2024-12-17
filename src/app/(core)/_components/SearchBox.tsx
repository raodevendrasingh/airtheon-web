"use client";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import { MdOutlineMessage } from "react-icons/md";
import { FaLink, FaXTwitter } from "react-icons/fa6";
import { TbSearch, TbNotes } from "react-icons/tb";
import { LuCommand, LuFileText } from "react-icons/lu";
import { useEffect, useState } from "react";
import { DialogTitle } from "@/components/ui/dialog";

export const SearchBox = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center md:w-72 transition-all duration-200"
            >
                <div className="md:hidden flex items-center justify-center p-2.5 hover:bg-accent rounded-lg">
                    <TbSearch className="h-5 w-5 text-secondary-foreground" />
                </div>

                <div
                    className="hidden md:flex items-center gap-3 w-full px-4 py-1.5 rounded-lg border
                        bg-accent/40 hover:bg-accent/70 transition-colors duration-200"
                >
                    <TbSearch className="h-5 w-5 text-secondary-foreground" />
                    <div className="flex items-center justify-between w-full">
                        <span className="text-sm text-muted-foreground">
                            Quick Search
                        </span>
                        <kbd
                            className="hidden md:flex h-6 items-center gap-1 rounded-md bg-muted px-2 font-mono text-xs
                                    font-medium text-muted-foreground shadow-sm"
                        >
                            <span className="flex items-center gap-1">
                                <LuCommand />K
                            </span>
                        </kbd>
                    </div>
                </div>
            </button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <DialogTitle className="sr-only">Quick Search</DialogTitle>
                <CommandInput placeholder="Type to search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem>
                            <LuFileText />
                            Notes
                        </CommandItem>
                        <CommandItem>
                            <MdOutlineMessage />
                            Messages
                        </CommandItem>
                        <CommandItem>
                            <FaXTwitter />
                            Tweets
                        </CommandItem>
                        <CommandItem>
                            <FaLink />
                            Links
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
};
