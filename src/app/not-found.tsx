"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound(): React.JSX.Element {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 bg-background/50">
            <div className="max-w-md w-full space-y-8 text-center">
                {/* Animated 404 number with subtle hover effect */}
                <h1 className="text-9xl font-bold text-foreground/20 transition-all duration-300 hover:text-foreground/40">
                    404
                </h1>

                {/* Enhanced error message section */}
                <div className="space-y-3">
                    <h2 className="text-3xl font-bold text-foreground/80 tracking-tight">
                        Page not found
                    </h2>
                    <p className="text-muted-foreground text-lg">
                    The page you're looking for doesn't exist or was removed.
                    </p>
                </div>

                {/* Improved action buttons */}
                <div className="pt-8 flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <Button
                        variant="outline"
                        className="h-11 px-6 text-base hover:bg-accent transition-colors duration-200"
                        onClick={() => window.history.back()}
                    >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Go Back
                    </Button>

                    <Link href="/" className="sm:w-auto">
                        <Button
                            variant="secondary"
                            className="h-11 px-6 text-base w-full transition-colors duration-200"
                        >
                            Return Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
