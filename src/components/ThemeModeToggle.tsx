"use client";

import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useTheme } from "next-themes";

export function ThemeModeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <div
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center rounded-lg w-full relative"
        >
            <span className="absolute left-2 flex items-center justify-center">
                <BsFillSunFill className="absolute h-3 w-3 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <BsFillMoonStarsFill className="absolute h-3 w-3 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </span>
            <span className="pl-6">Toggle Theme</span>
        </div>
    );
}
