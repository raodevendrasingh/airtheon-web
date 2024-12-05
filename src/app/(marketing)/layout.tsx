export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="flex flex-col min-h-screen">
            <div className="flex-1">{children}</div>
        </main>
    );
}
