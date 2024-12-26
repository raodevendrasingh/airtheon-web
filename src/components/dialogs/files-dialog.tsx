"use client";

import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface FilesDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export const FilesDialog = ({ isOpen, onClose }: FilesDialogProps) => (
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
            <DialogDescription>
                Upload documents, images, or other files
            </DialogDescription>
        </DialogHeader>
        <div className="p-4">
            <label
                className={cn(
                    "flex flex-col items-center justify-center w-full",
                    "h-64 rounded-lg cursor-pointer",
                    "border-2 border-dashed border-muted-foreground/25",
                    "bg-muted/50 hover:bg-muted",
                    "transition-colors duration-200",
                )}
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-4 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                        <span className="font-semibold">Click to upload</span>{" "}
                        or drag and drop
                    </p>
                </div>
                <input type="file" className="hidden" />
            </label>
        </div>
        <DialogFooter className="gap-2">
            <Button variant="outline" onClick={onClose}>
                Cancel
            </Button>
            <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Files
            </Button>
        </DialogFooter>
    </DialogContent>
);
