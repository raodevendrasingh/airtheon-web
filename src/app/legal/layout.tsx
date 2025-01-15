"use client";

import { Footer } from "@/app/legal/_components/footer";
import { Navbar } from "@/app/legal/_components/navbar";

export default function LegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 p-5">{children}</div>
            <Footer />
        </main>
    );
}
