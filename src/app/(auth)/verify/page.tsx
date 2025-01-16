"use client";

import { emailOtp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CircleAlert } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { verifyEmailSchema } from "@/lib/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoadingButton } from "@/components/LoadingButton";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { BrandLogoWordmark } from "@/components/brand-logo";

export default function Page() {
    const [pending, setPending] = useState<boolean>(false);
    const [countdown, setCountdown] = useState<number>(0);
    const email = localStorage.getItem("verificationEmail") as string;
    const [emailError, setEmailError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        document.title = "Verify Email | Airtheon";
    }, []);

    const form = useForm<z.infer<typeof verifyEmailSchema>>({
        resolver: zodResolver(verifyEmailSchema),
        defaultValues: {
            verificationCode: "",
        },
    });

    useEffect(() => {
        if (!email) {
            setEmailError("Email Not Found");
        }
    }, []);

    useEffect(() => {
        // If countdown is active, decrease it every second
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [countdown]);

    const handleResendEmail = async () => {
        try {
            setPending(true);
            await emailOtp.sendVerificationOtp({
                email: email!,
                type: "email-verification",
            });
            toast.success("Email sent again");
            // Start 60 second countdown
            setCountdown(60);
        } catch (error) {
            toast.error("Failed to resend email");
        } finally {
            setPending(false);
        }
    };

    const onSubmit = async (values: z.infer<typeof verifyEmailSchema>) => {
        await emailOtp.verifyEmail({
            email,
            otp: values.verificationCode,
            fetchOptions: {
                onRequest: () => {
                    setPending(true);
                },
                onResponse: () => {
                    setPending(false);
                },
                onSuccess: () => {
                    toast.success("Email Verified", {
                        description: "Sign in to continue",
                    });
                    router.push("/sign-in");
                },
                onError: (ctx) => {
                    toast.error("Failed to Verify Email", {
                        description:
                            ctx.error.message ?? "Invalid or expired token",
                    });
                },
            },
        });
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-accent/50 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <BrandLogoWordmark />
                <div className="flex flex-col gap-5">
                    {emailError ? (
                        <Card className="flex flex-col gap-4 items-center">
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl">
                                    Verification Error
                                </CardTitle>
                                <CardDescription>{emailError}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button onClick={() => router.push("/sign-up")}>
                                    Sign up with a different email
                                </Button>
                            </CardContent>
                            <CardFooter className="flex gap-2 items-start text-muted-foreground">
                                <CircleAlert />
                                Unverified emails will be deleted after 24 hours
                            </CardFooter>
                        </Card>
                    ) : (
                        <Card>
                            <CardHeader className="text-center">
                                <CardTitle className="text-2xl">
                                    Verify your account
                                </CardTitle>
                                <CardDescription className="text-left">
                                    Enter the one-time password sent to{" "}
                                    <span className="text-accent-foreground">
                                        {email}
                                    </span>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                    >
                                        <div className="grid gap-5">
                                            <FormField
                                                control={form.control}
                                                name="verificationCode"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col gap-2 items-center w-full">
                                                        <FormLabel className="text-center w-full">
                                                            One-Time Password
                                                        </FormLabel>
                                                        <FormControl>
                                                            <InputOTP
                                                                maxLength={6}
                                                                {...field}
                                                            >
                                                                <InputOTPGroup>
                                                                    {[
                                                                        ...Array(
                                                                            6,
                                                                        ),
                                                                    ].map(
                                                                        (
                                                                            _,
                                                                            index,
                                                                        ) => (
                                                                            <InputOTPSlot
                                                                                key={
                                                                                    index
                                                                                }
                                                                                index={
                                                                                    index
                                                                                }
                                                                            />
                                                                        ),
                                                                    )}
                                                                </InputOTPGroup>
                                                            </InputOTP>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <LoadingButton pending={pending}>
                                                Verify
                                                <HiOutlineArrowNarrowRight />
                                            </LoadingButton>
                                            <div className="text-center text-sm">
                                                Didn't receive the code?
                                                <Button
                                                    variant="link"
                                                    onClick={handleResendEmail}
                                                    disabled={
                                                        pending || countdown > 0
                                                    }
                                                    className="-ml-3 underline underline-offset-4 disabled:cursor-not-allowed"
                                                >
                                                    Resend
                                                    {countdown > 0 &&
                                                        ` (${countdown}s)`}
                                                </Button>
                                            </div>
                                        </div>
                                    </form>
                                </Form>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
