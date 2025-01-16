"use client";

import { BrandLogoWordmark } from "@/components/brand-logo";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

interface FooterLink {
    label: string;
    href: string;
}

interface FooterSection {
    title: string;
    links: FooterLink[];
}

const footerSections: FooterSection[] = [
    {
        title: "Product",
        links: [
            { label: "Features", href: "#" },
            { label: "Pricing", href: "#" },
            { label: "Changelog", href: "#" },
        ],
    },
    {
        title: "Company",
        links: [
            { label: "About", href: "#" },
            { label: "Blog", href: "#" },
            { label: "Careers", href: "#" },
        ],
    },
    {
        title: "Legal",
        links: [
            { label: "Privacy", href: "#" },
            { label: "Terms", href: "#" },
        ],
    },
];

export function Footer() {
    return (
        <footer className="border-t">
            <div className="mx-auto max-w-7xl px-5 py-12 md:py-18 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <BrandLogoWordmark />
                        <p className="text-sm text-muted-foreground max-w-xs">
                            Your AI-powered second brain for seamless knowledge
                            management and enhanced productivity.
                        </p>
                    </div>

                    {/* Links Section */}
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-8 xl:col-span-2 xl:mt-0">
                        {footerSections.map((section) => (
                            <div
                                key={section.title}
                                className="md:grid md:grid-cols-2 md:gap-8"
                            >
                                <div>
                                    <h3 className="text-sm font-semibold leading-6">
                                        {section.title}
                                    </h3>
                                    <ul role="list" className="mt-6 space-y-4">
                                        {section.links.map((link) => (
                                            <li key={link.label}>
                                                <Link
                                                    href={link.href}
                                                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <Separator className="mt-16 mb-8" />

                <div className="flex flex-col items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Airtheon. All rights
                        reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
