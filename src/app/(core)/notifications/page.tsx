"use client";

import { NotificationCard } from "@/components/notification-card";
import { Label } from "@/components/ui/label";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { dummyNotifications } from "@/DATA/dummy-notifications";
import { cn } from "@/lib/utils";
import { handleMarkAllAsRead } from "@/utils/noti-actions";
import { BellOff, CheckCheck } from "lucide-react";

export default function page() {
    return (
        <div className="max-w-4xl w-full mx-auto p-5 bg-card">
            <Label className="flex justify-between pb-5">
                <span className="text-base">Notifications & Updates</span>
                <span className="flex items-center gap-2">
                    <span
                        onClick={handleMarkAllAsRead}
                        className="cursor-pointer"
                    >
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger>
                                    <CheckCheck
                                        size={19}
                                        className={cn("text-muted-foreground")}
                                    />
                                </TooltipTrigger>
                                <TooltipContent side="bottom">
                                    <p>Mark all as read</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </span>
                </span>
            </Label>
            {dummyNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-44 text-center font-semibold text-muted-foreground p-5 space-y-2">
                    <BellOff size={32} className="text-muted-foreground" />
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
        </div>
    );
}
