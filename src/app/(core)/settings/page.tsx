"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { settingsTabs } from "@/DATA/page";

export default function SettingsPage() {
    const router = useRouter();
    const pathname = usePathname();
    const isDesktop = useMediaQuery("768px");

    useEffect(() => {
        if (isDesktop) {
            router.push("/settings/general");
        }
    }, [isDesktop, router]);

    const currentTab = settingsTabs.find(
        (tab) => pathname === tab.href || pathname.startsWith(tab.href + "/"),
    )?.value;

    if (isDesktop) return null;

    return (
        <div className="block md:hidden borde border-white w-full shrink-0 bg-background/30">
            <div className="sticky top-0 h-[calc(100vh-8rem)]">
                <Tabs
                    value={currentTab}
                    className="w-full"
                    orientation="vertical"
                    onValueChange={(value) => {
                        const tab = settingsTabs.find(
                            (tab) => tab.value === value,
                        );
                        if (tab) router.push(tab.href);
                    }}
                >
                    <TabsList className="h-full flex flex-col justify-start bg-transparent p-0">
                        {settingsTabs.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className={cn(
                                    "w-full justify-start px-2 py-1.5 h-10 font-normal",
                                    "border-0",
                                    "data-[state=active]:bg-primary/10 data-[state=active]:text-primary",
                                    "data-[state=inactive]:text-muted-foreground hover:bg-muted/50",
                                )}
                            >
                                <tab.icon size={20} className="mr-2" />
                                {tab.title}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
            </div>
        </div>
    );
}
