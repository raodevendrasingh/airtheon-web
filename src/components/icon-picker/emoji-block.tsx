"use client";

import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import EmojiPicker, { Theme } from "emoji-picker-react";
import { useTheme } from "next-themes";

interface EmojiListProps {
    onSelect: (value: {
        type: "icon" | "emoji" | "image";
        value: string;
    }) => void;
}

export function EmojiList({ onSelect }: EmojiListProps) {
    const { theme } = useTheme();

    return (
        <ScrollArea className="h-52 md:h-[290px] w-full rounded-xl border [&_.epr-category-nav]:hidden [&_.epr-search-container]:!bg-transparent [&_.epr-search]:!h-8 [&_.epr-emoji-category-label]:!text-xs [&_.epr-emoji-category-label]:mx-auto [&_.epr-emoji-category-label]:my-1 [&_.epr-emoji-category-label]:w-[95%] [&_.epr-emoji-category-label]:rounded [&_.epr-emoji-category-label]:!text-muted-foreground [&_.epr-emoji-category-label]:!font-medium">
            <EmojiPicker
                theme={theme === "dark" ? Theme.DARK : Theme.LIGHT}
                skinTonesDisabled
                onEmojiClick={(emojiData) =>
                    onSelect({ type: "emoji", value: emojiData.emoji })
                }
                lazyLoadEmojis={true}
                style={
                    {
                        borderRadius: "12px",
                        backgroundColor: "transparent",
                        "--epr-category-navigation-height": "0",
                        "--epr-search-height": "24px",
                        "--epr-category-label-height": "24px",
                    } as React.CSSProperties
                }
                width="100%"
                height="100%"
            />
        </ScrollArea>
    );
}
