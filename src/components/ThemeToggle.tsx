"use client";

import * as React from "react";
import { BsFillMoonStarsFill, BsFillSunFill } from "react-icons/bs";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <Button
            variant="outline"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex justify-center h-10 w-10 rounded-lg"
        >
            <BsFillSunFill className="absolute h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <BsFillMoonStarsFill className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle Theme</span>
        </Button>
    );
}
