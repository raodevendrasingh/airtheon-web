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
import { ImagePlus } from "lucide-react";
import Image from "next/image";

export interface IconData {
    id?: string;
    type: "icon" | "emoji" | "image";
    preview: string;
    buffer?: ArrayBuffer;
    fileName?: string;
    metadata?: {
        iconName?: string;
        unicode?: string;
        base64?: string;
        mimeType?: string;
    };
}

interface IconPickerProps {
    onIconSelect?: (iconData: IconData | null) => void;
}

export function IconPicker({ onIconSelect }: IconPickerProps) {
    const [iconData, setIconData] = useState<IconData | null>(null);

    const handleIconSelect = (selected: {
        type: "icon" | "emoji" | "image";
        preview: string;
        fileName?: string;
        buffer?: ArrayBuffer;
    }) => {
        let normalizedData: IconData;

        switch (selected.type) {
            case "icon":
                normalizedData = {
                    type: "icon",
                    preview: selected.preview,
                    metadata: {
                        iconName: selected.preview,
                    },
                };
                break;

            case "emoji":
                normalizedData = {
                    type: "emoji",
                    preview: selected.preview,
                    metadata: {
                        unicode: selected.preview.codePointAt(0)?.toString(16),
                    },
                };
                break;

            case "image":
                normalizedData = {
                    type: "image",
                    preview: selected.preview,
                    fileName: selected.fileName,
                    buffer: selected.buffer,
                    metadata: {
                        mimeType: selected.preview.split(";")[0].split(":")[1],
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
                    iconData.preview as keyof typeof Icons
                ] as React.FC<{ size: number }>;
                return IconComponent ? <IconComponent size={32} /> : null;
            }
            case "emoji":
                return <span className="text-3xl">{iconData.preview}</span>;
            case "image":
                return (
                    <Image
                        src={iconData.preview}
                        alt="Selected icon"
                        width={64}
                        height={64}
                        className="h-full w-full object-cover rounded-md"
                    />
                );
            default:
                return null;
        }
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                {iconData ? (
                    <div className="h-[70px] w-[70px] flex items-center justify-center border rounded-xl hover:border-primary/60 focus:border-primary transition-colors cursor-pointer select-none">
                        <div className="h-12 w-12 sm:h-10 sm:w-10 flex items-center justify-center">
                            {renderSelected()}
                        </div>
                    </div>
                ) : (
                    <div className="h-[70px] w-[70px] flex items-center justify-center border rounded-xl hover:border-primary/60 focus:border-primary transition-colors cursor-pointer select-none">
                        <ImagePlus className="h-10 w-10" />
                    </div>
                )}
            </PopoverTrigger>

            <PopoverContent
                side="bottom"
                align="center"
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
