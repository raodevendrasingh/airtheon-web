"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(minWidth: string) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const query = window.matchMedia(`(min-width: ${minWidth})`);
        setMatches(query.matches);

        const listener = (e: MediaQueryListEvent) => {
            setMatches(e.matches);
        };

        query.addEventListener("change", listener);
        return () => query.removeEventListener("change", listener);
    }, [minWidth]);

    return matches;
}
