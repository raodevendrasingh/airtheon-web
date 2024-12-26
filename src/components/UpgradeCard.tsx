import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const UpgradeCard = () => {
    return (
        <Card className="w-[230px] bg-gradient-to-br from-primary/5 to-accent/50 border-border overflow-hidden">
            <CardContent className="p-4 space-y-3">
                <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-foreground" />
                    <h3 className="font-semibold text-foreground">
                        Upgrade Now
                    </h3>
                </div>

                <p className="text-sm text-muted-foreground">
                    Get access to premium features and enhance your experience
                </p>

                <Button variant="secondary" className="w-full border">
                    Upgrade
                </Button>
            </CardContent>
        </Card>
    );
};
