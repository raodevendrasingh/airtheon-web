"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function LegalPage() {
    const legalPages = [
        { name: "Terms of Service", href: "/legal/terms-of-service" },
        { name: "Privacy Policy", href: "/legal/privacy-policy" },
        { name: "Refund Policy", href: "/legal/refund-policy" },
        { name: "Acceptable Use Policy", href: "/legal/acceptable-use-policy" },
    ];

    return (
        <div className="container mx-auto max-w-3xl min-h-screen py-10">
            <div className="space-y-8">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold tracking-tighter">
                        Legal
                    </h1>
                    <p className="text-muted-foreground">
                        Welcome to our legal section. Here you will find
                        important information about our policies. Please review
                        these documents carefully to understand your rights and
                        obligations when using our services.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    {legalPages.map((page) => (
                        <Link
                            key={page.href}
                            href={page.href}
                            className="group text-sm text-muted-foreground"
                        >
                            <div className="w-full border border-border rounded-lg px-3 py-3 flex items-center justify-between hover:bg-accent/30 hover:text-lime-400 transition-colors">
                                <span className="text-sm font-medium">
                                    {page.name}
                                </span>

                                <ArrowRight
                                    size={18}
                                    className="group-hover:-rotate-45 transition duration-200"
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
