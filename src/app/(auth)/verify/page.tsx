"use client";

import { emailOtp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { GalleryVerticalEnd, CircleAlert } from "lucide-react";
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
import Link from "next/link";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

export default function Page() {
    const [pending, setPending] = useState<boolean>(false);
    const email = localStorage.getItem("verificationEmail") as string;
    const [emailError, setEmailError] = useState<string | null>(null);
    const router = useRouter();

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
        localStorage.removeItem("verificationEmail");
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link
                    href="#"
                    className="flex items-center gap-2 self-center font-medium"
                >
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    Acme Inc.
                </Link>
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
                                        {email ? email : "the registered email"}
                                    </span>{" "}
                                    <br />
                                    <Link
                                        href="/sign-up"
                                        className="underline underline-offset-4"
                                    >
                                        Change email
                                    </Link>
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
                                                Didn't receive the code?{" "}
                                                <Link
                                                    href=""
                                                    onClick={() => {}} // resend email
                                                    className="underline underline-offset-4"
                                                >
                                                    Resend
                                                </Link>
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
