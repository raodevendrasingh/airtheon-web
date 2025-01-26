"use client";

import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { settingsTabs } from "@/data/settingsTabs";

export default function SettingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const currentTab =
        settingsTabs.find(
            (tab) =>
                pathname === tab.href || pathname.startsWith(tab.href + "/"),
        )?.value ?? "general";

    return (
        <div className="min-h-[calc(100vh-3rem)] w-full">
            <div className="flex flex-col md:flex-row md:space-x-6">
                <div className="hidden md:block w-64 shrink-0 border-r border-border bg-background/30">
                    <div className="sticky top-0 p-4 h-[calc(100vh-50px)]">
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

                {/* Content */}
                <div className="p-5 w-full">{children}</div>
            </div>
        </div>
    );
}
