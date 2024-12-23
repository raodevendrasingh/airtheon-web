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

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="fixed z-50 flex h-12 shrink-0 w-full border-b border-border items-center gap-2 bg-background/70 backdrop-blur-md transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
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
                </header>
                <main className="flex flex-1 flex-col gap-2 mt-12">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}
