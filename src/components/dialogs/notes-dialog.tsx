"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface NotesDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export const NotesDialog = ({ isOpen, onClose }: NotesDialogProps) => (
    <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
            <DialogTitle>Add Notes</DialogTitle>
            <DialogDescription>
                Write your thoughts, ideas, or any information
            </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <Input
                placeholder="Title"
                className="border-input focus:ring-ring"
            />
            <Textarea
                placeholder="Write your notes here..."
                className={cn(
                    "min-h-[300px] resize-none",
                    "border-input focus:ring-ring",
                )}
            />
        </div>
        <DialogFooter className="gap-2">
            <Button variant="outline" onClick={onClose}>
                Cancel
            </Button>
            <Button>
                <Save className="mr-2 h-4 w-4" />
                Save Note
            </Button>
        </DialogFooter>
    </DialogContent>
);
