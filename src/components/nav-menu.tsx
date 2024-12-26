"use client";

import { type LucideIcon } from "lucide-react";

import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";

export function NavMenu({
    menu,
}: {
    menu: {
        name: string;
        url: string;
        urlSm?: string;
        icon: LucideIcon;
    }[];
}) {
    const isMobile = useIsMobile();
    return (
        <SidebarGroup>
            <SidebarMenu>
                {menu.map((item) => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild>
                            {isMobile && item.urlSm ? (
                                <Link href={item.urlSm}>
                                    <item.icon />
                                    <span>{item.name}</span>
                                </Link>
                            ) : (
                                <Link href={item.url}>
                                    <item.icon />
                                    <span>{item.name}</span>
                                </Link>
                            )}
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
