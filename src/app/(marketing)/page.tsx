import { Navbar } from "@/app/(marketing)/_components/navbar";
import { Footer } from "@/app/(marketing)/_components/footer";
import { AnimatedCircles } from "@/components/ui/animated-circles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function HomePage() {
    return (
        <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
                <section className="relative overflow-hidden">
                    <AnimatedCircles />
                    <div className="container mx-auto px-5 relative flex flex-col items-center justify-center gap-4 py-24 md:py-28 lg:py-32 xl:py-36">
                        <div className="space-y-4 text-center">
                            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                                Copilot for your brain
                            </h1>
                            <p className="mx-auto max-w-[700px] text-pretty text-lg text-muted-foreground sm:text-xl">
                                Transform your thoughts into actionable
                                insights. Organize, analyze, and enhance your
                                knowledge with AI-powered assistance.
                            </p>
                        </div>
                        <div className="mx-auto w-full max-w-sm space-y-2">
                            <form className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                                <Input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full py-3 md:py-[19px] sm:max-w-lg flex-1 bg-accent"
                                />
                                <Button
                                    type="submit"
                                    className="w-full sm:w-auto"
                                >
                                    Join Waitlist
                                </Button>
                            </form>
                            <p className="text-xs text-muted-foreground">
                                Join the waitlist to get early access.{" "}
                                <Link
                                    href="/terms"
                                    className="underline underline-offset-2"
                                >
                                    Terms & Conditions
                                </Link>
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
