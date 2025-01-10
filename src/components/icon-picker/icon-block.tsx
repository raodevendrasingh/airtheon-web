"use client";

import React, { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Search } from "lucide-react";
import * as Fa6Icons from "react-icons/fa6";

interface IconListProps {
    onSelect: (value: {
        type: "icon" | "emoji" | "image";
        value: string;
    }) => void;
}

export function IconList({ onSelect }: IconListProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const iconList = useMemo(() => {
        return Object.keys(Fa6Icons).filter(
            (key) =>
                typeof Fa6Icons[key as keyof typeof Fa6Icons] === "function" &&
                key.startsWith("Fa"),
        );
    }, []);

    const filteredIcons = useMemo(() => {
        return iconList.filter((name) =>
            name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }, [iconList, searchTerm]);

    return (
        <div className="relative">
            <div className="relative flex items-center mb-4">
                <Input
                    placeholder="Search icons..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 rounded-lg h-10 bg-muted"
                />
                <Search
                    className="absolute left-2.5 top-3 text-muted-foreground"
                    size={16}
                />
            </div>

            <ScrollArea className="h-[152px] md:h-[232px] w-full rounded-xl border">
                <div className="grid grid-cols-7 gap-2 p-4">
                    {filteredIcons.map((iconName) => {
                        const Icon =
                            Fa6Icons[iconName as keyof typeof Fa6Icons];
                        return (
                            <Button
                                key={iconName}
                                variant="ghost"
                                className="h-10 w-10 p-0 hover:bg-muted flex items-center justify-center"
                                onClick={() =>
                                    onSelect({ type: "icon", value: iconName })
                                }
                            >
                                {React.createElement(
                                    Icon as React.ComponentType,
                                    {},
                                )}
                            </Button>
                        );
                    })}
                </div>
            </ScrollArea>
        </div>
    );
}
