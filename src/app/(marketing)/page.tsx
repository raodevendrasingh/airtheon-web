"use client";

import { Navbar } from "@/app/(marketing)/_components/navbar";
import { Footer } from "@/app/(marketing)/_components/footer";
import { AnimatedCircles } from "@/components/ui/animated-circles";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { waitlistSchema } from "@/lib/authSchema";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { LoadingButton } from "@/components/LoadingButton";
import axios from "axios";
import { toast } from "sonner";
import { sendWaitlistConfirmationEmail } from "@/actions/send-waitlist-confirmation-email";

export default function HomePage() {
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
            const url = "/api/waitlist";
            const response = await axios.post(url, email, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (response.status === 201) {
                form.reset();
                toast.success("Added to waitlist successfully");
                sendWaitlistConfirmationEmail({ email: values.email });
            }
        } catch (error: any) {
            console.error("Unexpected Error: ", error);
            toast.error(error.response.data.message);
        } finally {
            setPending(false);
        }
    };

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
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            placeholder="Enter your email"
                                                            className="w-full py-3 md:py-[19px] sm:max-w-lg flex-1 bg-accent"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <LoadingButton
                                            pending={pending}
                                            className="w-full sm:w-auto"
                                        >
                                            Join Waitlist
                                        </LoadingButton>
                                    </div>
                                </form>
                            </Form>
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
