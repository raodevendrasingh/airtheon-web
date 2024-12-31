"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

export const Navbar = () => {
    const handleShare = async () => {
        const shareMessage =
            "Check out Airtheon - Your AI-powered second brain for seamless knowledge management! https://airtheon.com";

        try {
            if (navigator.clipboard && window.isSecureContext) {
                // Modern clipboard API
                await navigator.clipboard.writeText(shareMessage);
            } else {
                // Fallback for mobile/older browsers
                const textArea = document.createElement("textarea");
                textArea.value = shareMessage;
                textArea.style.position = "fixed";
                textArea.style.left = "-999999px";
                textArea.style.top = "-999999px";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand("copy");
                textArea.remove();
            }

            toast.success("Link copied!", {
                description:
                    "Share this link with your friends and on social media.",
                duration: 3000,
            });
        } catch (error) {
            toast.error("Failed to copy", {
                description: "Please try again.",
            });
        }
    };

    return (
        <header className="sticky top-0 w-full z-[100]">
            <div className="relative w-full bg-background/80 supports-[backdrop-filter]:bg-background/70 backdrop-blur-lg">
                {/* Navbar Content */}
                <div className="flex h-16 items-center justify-between px-5 lg:px-8">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="font-bold text-3xl">Airtheon</span>
                        </Link>
                    </div>
                    <div className="flex items-center space-x-6">
                        <Button variant="outline" onClick={handleShare}>
                            Share Word
                            <Share2 />
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};
