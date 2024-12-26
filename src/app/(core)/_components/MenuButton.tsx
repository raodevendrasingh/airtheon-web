import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface MenuButtonProps {
    icon: LucideIcon;
    text: string;
    onClick: () => void;
}

export const MenuButton = ({ icon: Icon, text, onClick }: MenuButtonProps) => (
    <Button
        onClick={onClick}
        variant="ghost"
        className={cn(
            "flex flex-col items-center justify-center p-4 h-auto gap-2",
            "transition-colors duration-200",
            "hover:bg-muted",
            "rounded-xl border border-border",
        )}
    >
        <div
            className={cn(
                "w-12 h-12 flex items-center justify-center rounded-full",
                "bg-primary/10 dark:bg-primary/20",
            )}
        >
            <Icon className="w-6 h-6 text-primary" />
        </div>
        <span className="text-sm font-medium">{text}</span>
    </Button>
);
