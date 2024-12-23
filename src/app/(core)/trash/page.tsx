import { Button } from "@/components/ui/button";

export default function TrashPage() {
    return (
        <section className="p-5 max-w-7xl w-full h-[calc(100vh-3rem)] mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div className="flex flex-col space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight">Trash</h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your deleted spaces and memories.
                    </p>
                </div>
                <Button
                    variant="outline"
                    disabled
                    className="select-none hidden md:block"
                >
                    Empty Trash
                </Button>
            </div>
            <div className="flex flex-col space-y-3 w-full">
                <div className="flex justify-center items-center bg-muted rounded-lg h-24 w-full select-none">
                    <p className="text-xl font-semibold text-primary/60">
                        Trash Empty
                    </p>
                </div>
            </div>
        </section>
    );
}
