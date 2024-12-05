import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";
import { HomeTabs } from "../_components/HomeTabs";

export default function page() {
    const user = "Dev";
    return (
        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 min-h-screen">
            <div className="absolute left-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-border to-transparent" />
            <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-border to-transparent" />
            <header className="py-10 w-full">
                <div className="relative -top-5 h-[1px] w-full bg-gradient-to-r from-transparent via-border to-transparent" />
                <div className="flex items-center justify-between">
                    <span>
                        <h1 className="text-4xl font-medium">Hi, {user}</h1>
                    </span>
                    <span className="flex items-center">
                        <Button variant="outline">
                            <GoPlus />
                            <span>Add Note</span>
                        </Button>
                    </span>
                </div>
                <div className="relative inset-x-0 -bottom-5 h-[0.5px] w-full bg-gradient-to-r from-transparent via-border to-transparent" />
            </header>
            <div className="flex flex-col mt-5">
                <HomeTabs />
            </div>
        </div>
    );
}
