import { cn } from "@/lib/utils";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { MoveRight } from "lucide-react";

export function AnimatedText() {
    return (
        <div className="z-10 flex items-center justify-center">
            <div
                className={cn(
                    "group rounded-full border border-black/5 bg-zinc-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-zinc-200 dark:border-white/5 dark:bg-zinc-900 dark:hover:bg-zinc-800 select-none",
                )}
            >
                <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-zinc-600 hover:duration-300 hover:dark:text-zinc-400">
                    <span>✨ Sign Up for Waitlist Now</span>
                    <MoveRight className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                </AnimatedShinyText>
            </div>
        </div>
    );
}
