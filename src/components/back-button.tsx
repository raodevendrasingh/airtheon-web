"use client";

import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

export const BackButton = () => {
    return (
        <Button
            variant="outline"
            onClick={() => {
                window.history.back();
            }}
        >
            <MoveLeft />
            Back
        </Button>
    );
};
