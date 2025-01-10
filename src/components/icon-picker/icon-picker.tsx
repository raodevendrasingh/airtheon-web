"use client";

import React from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconList } from "@/components/icon-picker/icon-block";
import { EmojiList } from "@/components/icon-picker/emoji-block";
import { ImageUpload } from "@/components/icon-picker/image-block";

import { useState } from "react";
import * as Icons from "react-icons/fa6";
import type { IconData } from "@/types/icon-picker";
import { ImagePlus } from "lucide-react";

interface IconPickerProps {
    onIconSelect?: (iconData: IconData | null) => void;
}

export function IconPicker({ onIconSelect }: IconPickerProps) {
    const [iconData, setIconData] = useState<IconData | null>(null);

    const handleIconSelect = (selected: {
        type: "icon" | "emoji" | "image";
        value: string;
    }) => {
        let normalizedData: IconData;

        switch (selected.type) {
            case "icon":
                normalizedData = {
                    type: "icon",
                    value: selected.value,
                    metadata: {
                        iconName: selected.value,
                    },
                };
                break;

            case "emoji":
                normalizedData = {
                    type: "emoji",
                    value: selected.value,
                    metadata: {
                        unicode: selected.value.codePointAt(0)?.toString(16),
                    },
                };
                break;

            case "image":
                normalizedData = {
                    type: "image",
                    value: selected.value,
                    metadata: {
                        base64: selected.value,
                        mimeType: selected.value.split(";")[0].split(":")[1],
                    },
                };
                break;

            default:
                return;
        }

        setIconData(normalizedData);
        onIconSelect?.(normalizedData);
    };

    const renderSelected = () => {
        if (!iconData) return null;

        switch (iconData.type) {
            case "icon": {
                const IconComponent = Icons[
                    iconData.value as keyof typeof Icons
                ] as React.FC<{ size: number }>;
                return IconComponent ? <IconComponent size={24} /> : null;
            }
            case "emoji":
                return <span className="text-2xl">{iconData.value}</span>;
            case "image":
                return (
                    <img
                        src={iconData.value}
                        alt="Selected icon"
                        className="h-8 w-8 object-cover rounded-md"
                    />
                );
            default:
                return null;
        }
    };
    {
        /* <pre className="mt-4 text-xs">
                                {JSON.stringify(iconData, null, 2)}
                            </pre> */
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                {iconData ? (
                    <div className="h-14 w-14 flex items-center justify-center border rounded-lg hover:border-primary/60 focus:border-primary transition-colors cursor-pointer select-none">
                        <div className="h-8 w-8 flex items-center justify-center">
                            {renderSelected()}
                        </div>
                    </div>
                ) : (
                    <div className="h-14 w-14 flex items-center justify-center border rounded-lg hover:border-primary/60 focus:border-primary transition-colors cursor-pointer select-none">
                        <ImagePlus className="h-8 w-8" />
                    </div>
                )}
            </PopoverTrigger>

            <PopoverContent
                side="bottom"
                align="start"
                className="h-72 w-72 md:h-96 md:w-96 p-0"
            >
                <div className="bg-accent/30 rounded-3xl h-full w-full">
                    <Tabs defaultValue="icons" className="w-full p-3 md:p-5">
                        <TabsList className="grid w-full grid-cols-3 bg-transparent">
                            <TabsTrigger value="icons">Icons</TabsTrigger>
                            <TabsTrigger value="emoji">Emoji</TabsTrigger>
                            <TabsTrigger value="image">Image</TabsTrigger>
                        </TabsList>

                        <TabsContent value="icons" className="mt-4">
                            <IconList onSelect={handleIconSelect} />
                        </TabsContent>

                        <TabsContent value="emoji" className="mt-4">
                            <EmojiList onSelect={handleIconSelect} />
                        </TabsContent>

                        <TabsContent value="image" className="mt-4">
                            <ImageUpload onSelect={handleIconSelect} />
                        </TabsContent>
                    </Tabs>
                </div>
            </PopoverContent>
        </Popover>
    );
}
