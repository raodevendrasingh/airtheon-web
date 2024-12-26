"use client";

import * as React from "react";
import {
    Archive,
    Blocks,
    Command,
    History,
    Layers,
    LayoutDashboard,
    Search,
    Settings,
    Trash2,
} from "lucide-react";

import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarRail,
    SidebarSeparator,
} from "@/components/ui/sidebar";
import { NavSpaces } from "@/components/nav-spaces";
import { NavMenu } from "@/components/nav-menu";
import { NavFavourite } from "@/components/nav-favourite";
import { UpgradeCard } from "@/components/UpgradeCard";
import { cn } from "@/lib/utils";

const data = {
    teams: [
        {
            name: "Evil Corp.",
            logo: Command,
            plan: "Free",
        },
    ],
    navMain: [
        {
            title: "Spaces",
            url: "/spaces",
            icon: Layers,
            items: [],
        },

        {
            title: "History",
            url: "/history",
            icon: History,
            items: [],
        },
    ],
    workspaceItems: [
        {
            name: "Search",
            url: "/search",
            icon: Search,
        },
        {
            name: "Dash",
            url: "/dash",
            icon: LayoutDashboard,
        },
    ],
    bottomMenu: [
        {
            name: "Plugins",
            url: "/plugins",
            icon: Blocks,
        },
        {
            name: "Archives",
            url: "/archives",
            icon: Archive,
        },
        {
            name: "Settings",
            url: "/settings/general",
            urlSm: "/settings",
            icon: Settings,
        },
        {
            name: "Trash",
            url: "/trash",
            icon: Trash2,
        },
    ],
    favourites: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <TeamSwitcher teams={data.teams} />
                <NavMenu menu={data.workspaceItems} />
                <SidebarSeparator />
            </SidebarHeader>
            <SidebarContent>
                {data.favourites.length > 0 && (
                    <NavFavourite favourites={data.favourites} />
                )}
                <NavSpaces />
                <SidebarSeparator className="h-[0.5px]" />
                <NavMenu menu={data.bottomMenu} />
            </SidebarContent>
            <SidebarFooter>
                <div
                    className={cn(
                        "mx-auto",
                        "transition-opacity duration-700 ease-in-out",
                        "group-data-[collapsible=icon]:opacity-0",
                        "group-data-[collapsible=icon]:scale-95",
                        "group-data-[collapsible=icon]:translate-x-4",
                        "group-data-[collapsible=icon]:invisible",
                        "group-data-[collapsible=icon]:pointer-events-none",
                    )}
                >
                    <UpgradeCard />
                </div>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
