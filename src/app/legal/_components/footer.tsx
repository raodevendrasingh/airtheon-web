"use client";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

interface SocialLink {
    icon: any;
    label: string;
    href: string;
}

const socialLinks: SocialLink[] = [
    {
        icon: <FaXTwitter size={20} />,
        label: "Twitter",
        href: "https://twitter.com/airtheonlabs",
    },
    {
        icon: <FaGithub size={20} />,
        label: "GitHub",
        href: "https://github.com/airtheon-labs",
    },
];

export function Footer() {
    return (
        <footer className="border-t">
            <div className="mx-auto max-w-7xl px-5 pt-5 lg:px-8">
                <div className="flex items-center justify-between gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="font-bold text-2xl">
                                Airtheon
                                <span className="ml-1.5 text-lime-400">
                                    Help
                                </span>
                            </span>
                        </Link>
                    </div>
                    <div className="flex justify-center items-center gap-4">
                        {socialLinks.map((social) => (
                            <Link
                                key={social.href}
                                href={social.href}
                                className="text-muted-foreground hover:text-lime-400 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {social.icon}
                            </Link>
                        ))}
                    </div>
                </div>

                <Separator className="my-5" />

                <div className="flex flex-col items-center gap-4 py-5">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
