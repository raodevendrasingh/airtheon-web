export default function ArchivesPage() {
    return (
        <section className="p-5 max-w-7xl w-full h-[calc(100vh-3rem)] mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight">Archives</h1>
                <p className="text-muted-foreground mt-2">
                    Manage your archived spaces and memories.
                </p>
            </div>
            <div className="flex flex-col space-y-3 w-full">
                <div className="flex justify-center items-center bg-muted rounded-lg h-24 w-full select-none">
                    <p className="text-xl font-semibold text-primary/60">
                        No Items Archived Yet
                    </p>
                </div>
            </div>
        </section>
    );
}
