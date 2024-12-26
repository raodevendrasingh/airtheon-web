"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link2 } from "lucide-react";
import {
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface WebpageDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export const WebpageDialog = ({ isOpen, onClose }: WebpageDialogProps) => (
    <DialogContent>
        <DialogHeader>
            <DialogTitle>Add Webpage</DialogTitle>
            <DialogDescription>
                Save an interesting link to your memory space
            </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <Input
                placeholder="Title"
                className="border-input focus:ring-ring"
            />
            <Input
                placeholder="URL (https://...)"
                className="border-input focus:ring-ring"
            />
        </div>
        <DialogFooter className="gap-2">
            <Button variant="outline" onClick={onClose}>
                Cancel
            </Button>
            <Button>
                <Link2 className="mr-2 h-4 w-4" />
                Save URL
            </Button>
        </DialogFooter>
    </DialogContent>
);
