"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, FileText, Link, Upload, Layers2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { MenuButton } from "@/app/(core)/_components/MenuButton";
import { NotesDialog } from "./notes-dialog";
import { WebpageDialog } from "./webpage-dialog";
import { FilesDialog } from "./files-dialog";
import { SpaceDialog } from "./space-dialog";

type DialogType = "notes" | "webpage" | "files" | "space";

export const MemoryDialog = () => {
    const [openDialog, setOpenDialog] = useState<DialogType | null>(null);

    const openSpecificDialog = (dialogType: DialogType) => {
        setOpenDialog(dialogType);
    };

    const closeDialog = () => {
        setOpenDialog(null);
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button
                        variant="secondary"
                        size="sm"
                        className={cn(
                            "fixed top-2 right-5 md:right-14",
                            "bg-primary text-primary-foreground",
                            "hover:bg-primary/90",
                            "transition-colors",
                        )}
                    >
                        <Plus className="h-4 w-4" />
                        <span className="hidden md:block">Add Memory</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[512px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-center">
                            Add to Your Memory Space
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            Choose how you want to add content to your memory
                            space
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4 p-4">
                        <MenuButton
                            icon={FileText}
                            text="Notes"
                            onClick={() => openSpecificDialog("notes")}
                        />
                        <MenuButton
                            icon={Link}
                            text="Webpage"
                            onClick={() => openSpecificDialog("webpage")}
                        />
                        <MenuButton
                            icon={Upload}
                            text="Upload Files"
                            onClick={() => openSpecificDialog("files")}
                        />
                        <MenuButton
                            icon={Layers2}
                            text="Create Space"
                            onClick={() => openSpecificDialog("space")}
                        />
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={openDialog === "notes"} onOpenChange={closeDialog}>
                <NotesDialog
                    isOpen={openDialog === "notes"}
                    onClose={closeDialog}
                />
            </Dialog>

            <Dialog open={openDialog === "webpage"} onOpenChange={closeDialog}>
                <WebpageDialog
                    isOpen={openDialog === "webpage"}
                    onClose={closeDialog}
                />
            </Dialog>

            <Dialog open={openDialog === "files"} onOpenChange={closeDialog}>
                <FilesDialog
                    isOpen={openDialog === "files"}
                    onClose={closeDialog}
                />
            </Dialog>

            <Dialog open={openDialog === "space"} onOpenChange={closeDialog}>
                <SpaceDialog
                    isOpen={openDialog === "space"}
                    onClose={closeDialog}
                />
            </Dialog>
        </>
    );
};
