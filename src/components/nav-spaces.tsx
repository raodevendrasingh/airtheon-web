"use client";

import {
    Archive,
    Forward,
    MoreHorizontal,
    Shapes,
    SquarePen,
    SquarePlus,
    Star,
    Trash2,
} from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useState } from "react";
import { DialogType } from "@/components/dialogs/memory-dialog";
import { Dialog } from "@/components/ui/dialog";
import { SpaceDialog } from "@/components/dialogs/space-dialog";

export function NavSpaces() {
    const { isMobile } = useSidebar();

    const [openSpacesDialog, setOpenSpacesDialog] = useState<DialogType | null>(
        null,
    );
    const openDialog = (dialogType: DialogType) => {
        setOpenSpacesDialog(dialogType);
    };

    const closeDialog = () => {
        setOpenSpacesDialog(null);
    };

    const spaces = [
        {
            name: "Default",
            url: "/space/default",
            icon: Shapes,
        },
    ];

    return (
        <SidebarGroup>
            <SidebarGroupLabel className="flex items-center justify-between">
                <span className="select-none">Spaces</span>
                <span
                    className="cursor-pointer"
                    onClick={() => openDialog("space")}
                >
                    <SquarePlus size={18} className="text-muted-foreground hover:text-accent-foreground transition-colors" />
                </span>
            </SidebarGroupLabel>
            <SidebarMenu>
                {spaces.map((item) => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild>
                            <Link href={item.url}>
                                <item.icon />
                                <span>{item.name}</span>
                            </Link>
                        </SidebarMenuButton>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuAction showOnHover>
                                    <MoreHorizontal />
                                    <span className="sr-only">More</span>
                                </SidebarMenuAction>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-52 rounded-xl"
                                side={isMobile ? "bottom" : "right"}
                                align={isMobile ? "end" : "start"}
                            >
                                <DropdownMenuItem>
                                    <Star className="text-muted-foreground" />
                                    <span>Add to Favourites</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <SquarePen className="text-muted-foreground" />
                                    <span>Rename</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Forward className="text-muted-foreground" />
                                    <span>Share</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Archive className="text-muted-foreground" />
                                    <span>Archive</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    variant="destructive"
                                    className="hover:text-destructive-foreground"
                                >
                                    <Trash2 className="text-muted-foreground" />
                                    <span>Move to Trash</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
            <Dialog
                open={openSpacesDialog === "space"}
                onOpenChange={closeDialog}
            >
                <SpaceDialog
                    isOpen={openSpacesDialog === "space"}
                    onClose={closeDialog}
                />
            </Dialog>
        </SidebarGroup>
    );
}
