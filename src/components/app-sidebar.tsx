"use client";

import * as React from "react";
import {
    Archive,
    Bell,
    Blocks,
    Command,
    History,
    Layers,
    LayoutDashboard,
    Map,
    Plane,
    Search,
    Settings,
    Shapes,
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
            url: "/settings",
            icon: Settings,
        },
        {
            name: "Trash",
            url: "/trash",
            icon: Trash2,
        },
    ],
    favourites: [],
    spaces: [
        {
            name: "Monaco",
            url: "/space/monaco",
            icon: History,
        },
        {
            name: "Gamma",
            url: "/space/gamma",
            icon: Map,
        },
        {
            name: "Zeta",
            url: "/space/zeta",
            icon: Plane,
        },
        {
            name: "Aperture",
            url: "/space/aperture",
            icon: Shapes,
        },
    ],
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
                <NavSpaces spaces={data.spaces} />
                <SidebarSeparator className="h-[0.5px]" />
                <NavMenu menu={data.bottomMenu} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
