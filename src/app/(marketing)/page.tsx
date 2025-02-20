"use client";

import { Navbar } from "@/app/(marketing)/_components/navbar";
import { AnimatedCircles } from "@/components/ui/animated-circles";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { waitlistSchema } from "@/lib/auth-schema";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { ArrowRightIcon } from "lucide-react";
import { Footer2 } from "./_components/footer2";
import { AnimatedText } from "@/components/animated-text";

export default function WaitlistPage() {
    const [pending, setPending] = useState<boolean>(false);

    const form = useForm<z.infer<typeof waitlistSchema>>({
        resolver: zodResolver(waitlistSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof waitlistSchema>) => {
        try {
            setPending(true);
            const email = { email: values.email };
            const url = `/api/waitlist`;
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(email),
            });
            if (response.status === 201) {
                form.reset();
                toast.success("Added to waitlist successfully");
                fetch(`/api/email/waitlist`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(email),
                });
            }
        } catch (error: any) {
            console.log("Unexpected Error: ", error);
            toast.error(error.response.data.message);
        } finally {
            setPending(false);
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
                <section className="h-[80vh] pt-16 relative overflow-hidden">
                    <AnimatedText />
                    <AnimatedCircles />
                    <div className="container mx-auto px-5 relative flex flex-col items-center justify-center gap-10 py-24 md:py-28 ">
                        <div className="space-y-4 text-center">
                            <h1 className="font-bold tracking-tighter text-5xl md:text-6xl lg:text-7xl">
                                Copilot for your brain
                            </h1>
                            <p className="mx-auto max-w-[700px] text-pretty text-lg text-muted-foreground sm:text-xl">
                                Capture, connect, and conquer your day with AI.
                            </p>
                        </div>
                        <div className="mx-auto w-full max-w-md space-y-8">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="relative flex items-center">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem className="w-full">
                                                    <FormControl>
                                                        <div className="relative flex gap-2 w-full items-center bg-primary/90 backdrop-blur-md rounded-full border border-primary/10 shadow-2xl">
                                                            <Input
                                                                placeholder="Enter your email"
                                                                className="w-full h-14 px-6 md:text-base bg-transparent border-0 text-primary-foreground placeholder:text-accent/50 focus:outline-none focus:ring-0 rounded-full"
                                                                {...field}
                                                            />

                                                            <button
                                                                disabled={
                                                                    pending
                                                                }
                                                                className="group absolute right-1.5 inline-flex items-center justify-center h-12 px-6 rounded-full bg-primary-foreground hover:bg-primary-foreground/95
                                                                text-primary font-medium transition-all duration-300
                                                                hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]
                                                                disabled:opacity-70 disabled:cursor-not-allowed"
                                                            >
                                                                {pending ? (
                                                                    <span className="inline-flex items-center gap-2">
                                                                        Processing
                                                                        <svg
                                                                            className="w-4 h-4 animate-spin"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <circle
                                                                                className="opacity-25"
                                                                                cx="12"
                                                                                cy="12"
                                                                                r="10"
                                                                                stroke="currentColor"
                                                                                strokeWidth="4"
                                                                                fill="none"
                                                                            />
                                                                            <path
                                                                                className="opacity-75"
                                                                                fill="currentColor"
                                                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                            />
                                                                        </svg>
                                                                    </span>
                                                                ) : (
                                                                    <span className="flex items-center gap-0 transition-all duration-300 group-hover:gap-2">
                                                                        Join
                                                                        Waitlist
                                                                        <ArrowRightIcon className="w-0 h-4 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
                                                                    </span>
                                                                )}
                                                            </button>
                                                        </div>
                                                    </FormControl>
                                                    <FormMessage className="absolute ml-7 mt-2 text-sm text-red-400 animate-in slide-in-from-top-1 duration-100" />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </div>
                </section>
            </main>
            <Footer2 />
        </div>
    );
}
