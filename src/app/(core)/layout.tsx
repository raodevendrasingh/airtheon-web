"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { MemoryDialog } from "@/components/dialogs/memory-dialog";
import { NotificationMenu } from "@/app/(core)/_components/notification-menu";
import { OnboardingDialog } from "@/components/onboarding-dialog";
import { useEffect } from "react";

export default function CoreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const pathSegments = pathname.split("/").filter(Boolean);

    const breadcrumbs = pathSegments
        .map((segment, index) => {
            const isLast = index === pathSegments.length - 1;
            const isSpaceRoute = segment === "space";

            // Handle spaces route
            if (isSpaceRoute) {
                return (
                    <BreadcrumbItem key={segment}>
                        <BreadcrumbLink href="/spaces">Space</BreadcrumbLink>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>
                            {pathSegments[index + 1]?.charAt(0).toUpperCase() +
                                pathSegments[index + 1]?.slice(1)}
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                );
            }

            // Skip spaces route segment here as it's handled above
            if (pathSegments[index - 1] === "space") {
                return null;
            }

            // Handle static routes
            return (
                <BreadcrumbItem key={segment}>
                    {isLast ? (
                        <BreadcrumbPage>
                            {segment.charAt(0).toUpperCase() + segment.slice(1)}
                        </BreadcrumbPage>
                    ) : (
                        <>
                            <BreadcrumbLink href={`/${segment}`}>
                                {segment.charAt(0).toUpperCase() +
                                    segment.slice(1)}
                            </BreadcrumbLink>
                            <BreadcrumbSeparator />
                        </>
                    )}
                </BreadcrumbItem>
            );
        })
        .filter(Boolean);

    useEffect(() => {
        if (pathSegments.length > 1 && pathSegments[0] === "space") {
            const lastSegment = pathSegments[pathSegments.length - 1];
            document.title =
                lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
        } else {
            document.title =
                pathSegments[0].charAt(0).toUpperCase() +
                pathSegments[0].slice(1);
        }
    }, [pathSegments]);

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="fixed right-0 z-50 flex h-12 shrink-0 w-full md:w-[calc(100%-256px)] border-b border-border items-center gap-2 bg-background/70 backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 group-has-data-[collapsible=icon]/sidebar-wrapper:w-[calc(100%-48px)]">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>{breadcrumbs}</BreadcrumbList>
                        </Breadcrumb>
                    </div>
                    <NotificationMenu />
                    <MemoryDialog />
                </header>
                <main className="flex flex-1 flex-col gap-2 mt-12">
                    <OnboardingDialog />
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
