import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ThemeProvider from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import QueryProviders from "@/providers/query-provider";

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-outfit",
});

export const metadata: Metadata = {
    title: "Memory app",
    description: "Memory Management Agent",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="scrollbar-hide">
            <body
                className={`${outfit.variable} ${outfit.className} antialiased`}
            >
                <NextThemesProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ThemeProvider>
                        <QueryProviders>{children}</QueryProviders>
                        <Toaster />
                    </ThemeProvider>
                </NextThemesProvider>
            </body>
        </html>
    );
}
