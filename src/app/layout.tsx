import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import ThemeProvider from "@/providers/ThemeProvider";
import "./globals.css";

const outfit = Outfit({
    subsets: ["latin"],
    weight: ["300", "400", "500", "700"],
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
            <body className={`${outfit.className} antialiased`}>
                <NextThemesProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ThemeProvider>{children}</ThemeProvider>
                </NextThemesProvider>
            </body>
        </html>
    );
}
