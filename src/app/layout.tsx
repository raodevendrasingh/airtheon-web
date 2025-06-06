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
    title: "Airtheon",
    description: "AI-powered second-brain app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning className="scrollbar-hide">
            <head>
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/favicon-16x16.png"
                />
                <link rel="manifest" href="/site.webmanifest" />
            </head>
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
