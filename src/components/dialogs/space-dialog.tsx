"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, Save } from "lucide-react";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface SpaceDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SpaceDialog = ({ isOpen, onClose }: SpaceDialogProps) => (
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Create New Space</DialogTitle>
            <DialogDescription>
                Set up a new space for your memories
            </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">Space Name</label>
                <Input
                    placeholder="My Memory Space"
                    className="border-input focus:ring-ring"
                />
            </div>
            <div className="space-y-2">
                <label className="text-sm font-medium">Space Logo</label>
                <label
                    className={cn(
                        "flex flex-col items-center justify-center",
                        "w-full h-32 rounded-lg cursor-pointer",
                        "border-2 border-dashed border-muted-foreground/25",
                        "bg-muted/50 hover:bg-muted",
                        "transition-colors duration-200",
                    )}
                >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-6 h-6 mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                            Upload logo image
                        </p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" />
                </label>
            </div>
        </div>
        <DialogFooter className="gap-2">
            <Button variant="outline" onClick={onClose}>
                Cancel
            </Button>
            <Button>
                <Save className="mr-2 h-4 w-4" />
                Create Space
            </Button>
        </DialogFooter>
    </DialogContent>
);
