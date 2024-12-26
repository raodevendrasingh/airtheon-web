import { HomeTabs } from "../_components/HomeTabs";
import { getGreeting } from "@/utils/Greetings";

export default function page() {
    const user = "Dev";
    const greeting = getGreeting();
    return (
        <div className="relative max-w-7xl mx-auto w-full px-4 sm:px-6 min-h-screen">
            <header className="py-10 w-full">
                <div className="flex items-center justify-between">
                    <span>
                        <h1 className="text-4xl font-medium">
                            {greeting}, {user}
                        </h1>
                    </span>
                </div>
            </header>
            <div className="flex flex-col mt-5">
                <HomeTabs />
            </div>
        </div>
    );
}
