"use client";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { ArrowUpRight, Bell, BellOff, CheckCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dummyNotifications } from "@/DATA/dummy-notifications";
import { NotificationCard } from "@/components/notification-card";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { DialogTitle } from "@/components/ui/dialog";
import Link from "next/link";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { handleMarkAllAsRead } from "@/utils/notification-action";

export const NotificationMenu = () => {
    const isDesktop = useMediaQuery("768px");

    if (isDesktop) {
        return (
            <Sheet>
                <SheetTrigger asChild>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-1.5 right-[185px] rounded-full"
                    >
                        <Bell size={18} className="text-muted-foreground" />
                    </Button>
                </SheetTrigger>
                <SheetContent
                    hideCloseButton
                    side="right"
                    className="overflow-y-auto"
                >
                    <DialogTitle className="sr-only">Notifications</DialogTitle>
                    <Label className="flex justify-between pb-5">
                        <span className="text-base">Notifications</span>
                        <span className="flex items-center gap-5">
                            <SheetClose asChild>
                                <span
                                    onClick={handleMarkAllAsRead}
                                    className="cursor-pointer"
                                >
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <CheckCheck
                                                    size={19}
                                                    className="text-muted-foreground hover:text-accent-foreground transition-colors"
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom">
                                                <p>Mark all as read</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </span>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link href="/notifications">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <ArrowUpRight
                                                    size={19}
                                                    className="text-muted-foreground hover:text-accent-foreground transition-colors"
                                                />
                                            </TooltipTrigger>
                                            <TooltipContent side="bottom">
                                                <p>View in page</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <X
                                    size={19}
                                    className="text-muted-foreground hover:text-accent-foreground transition-colors cursor-pointer"
                                />
                            </SheetClose>
                        </span>
                    </Label>
                    {dummyNotifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-44 text-center font-semibold text-muted-foreground p-5 space-y-2">
                            <BellOff
                                size={32}
                                className="text-muted-foreground"
                            />
                            <p>You're all caught up!</p>
                            <p className="text-sm text-muted-foreground/70">
                                No new notifications at the moment.
                            </p>
                        </div>
                    ) : (
                        dummyNotifications.map((notification) => (
                            <NotificationCard
                                key={notification.id}
                                notification={notification}
                            />
                        ))
                    )}
                </SheetContent>
            </Sheet>
        );
    }

    return (
        <Link href="/notifications">
            <Button
                size="icon"
                variant="ghost"
                className="absolute top-1.5 right-20 rounded-full"
            >
                <Bell size={18} className="text-muted-foreground" />
            </Button>
        </Link>
    );
};
