import { Footer } from "@/app/legal/_components/footer";
import { Navbar } from "@/app/legal/_components/navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Legal",
};

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
