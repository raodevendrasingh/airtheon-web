"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    handleReadNotification,
    handleRemoveNotification,
} from "@/utils/notification-action";

interface NotificationCardProps {
    notification: {
        id: string;
        userId: string;
        workspaceId: string;
        type: string;
        content: string;
        read: boolean;
        createdAt: Date;
        updatedAt: Date;
    };
}

export const NotificationCard = ({ notification }: NotificationCardProps) => {
    return (
        <div
            className={cn(
                "flex items-start p-4 space-x-4 rounded-lg mb-1 border border-accent/60 hover:border-border select-none",
                notification.read ? "bg-background" : "bg-accent/60",
            )}
        >
            <Avatar>
                <AvatarImage
                    src={`https://i.pravatar.cc/150?u=${notification.userId}`}
                />
                <AvatarFallback>
                    {notification.userId.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <p className="text-sm font-medium text-foreground">
                    {notification.content}
                </p>
                <p className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(notification.createdAt), {
                        addSuffix: true,
                    })}
                </p>
            </div>
            <div className="flex items-center justify-center gap-2">
                {notification.read ? (
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleRemoveNotification}
                    >
                        <X className="text-muted-foreground/80" />
                    </Button>
                ) : (
                    <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleReadNotification}
                    >
                        <Check className="text-muted-foreground/80" />
                    </Button>
                )}
            </div>
        </div>
    );
};
