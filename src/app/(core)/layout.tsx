import { Navbar } from "./_components/Navbar";

export default function CoreLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="flex flex-col min-h-screen">
            <Navbar />
            {children}
        </section>
    );
}
