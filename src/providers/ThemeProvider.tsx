"use client";

import setGlobalColorTheme from "@/lib/ThemeColors";
import { useTheme, ThemeProviderProps } from "next-themes";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext<ThemeColorStateParams>(
    {} as ThemeColorStateParams,
);

export default function ThemeProvider({ children }: ThemeProviderProps) {
    const getSavedThemeColor = () => {
        try {
            return (
                (localStorage.getItem("themeColor") as ThemeColors) || "Zinc"
            );
        } catch (error) {
            "Zinc" as ThemeColors;
        }
    };

    const [themeColor, setThemeColor] = useState<ThemeColors>(
        getSavedThemeColor() as ThemeColors,
    );
    const [isMounted, setIsMounted] = useState(false);
    const { theme } = useTheme();

    useEffect(() => {
        setGlobalColorTheme(theme as "dark" | "light");

        if (!isMounted) {
            setIsMounted(true);
        }
    }, [themeColor, theme]);

    if (!isMounted) {
        return null;
    }

    return (
        <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useThemeContext() {
    return useContext(ThemeContext);
}
