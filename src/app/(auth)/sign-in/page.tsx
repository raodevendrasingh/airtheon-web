"use client";

import { GalleryVerticalEnd } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
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
import { Input } from "@/components/ui/input";
import { signInSchema } from "@/lib/authSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { GoogleAuthButton } from "../_components/GoogleAuthButton";
import { LoadingButton } from "@/components/LoadingButton";
import Link from "next/link";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

export default function LoginPage() {
    const [pending, setPending] = useState<boolean>(false);

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof signInSchema>) => {
        await signIn.email({
            email: values.email,
            password: values.password,
            callbackURL: "/dash",
            fetchOptions: {
                onRequest: () => {
                    setPending(true);
                },
                onResponse: () => {
                    setPending(false);
                },
                onSuccess: () => {
                    toast.success("Login Sucessfull");
                },
                onError: (ctx) => {
                    console.log("Unexpected Error: ", ctx);
                    toast.error("Something went wrong", {
                        description:
                            ctx.error.message ?? "Something went wrong.",
                    });
                },
            },
        });
    };

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a
                    href="#"
                    className="flex items-center gap-2 self-center font-medium"
                >
                    <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        <GalleryVerticalEnd className="size-4" />
                    </div>
                    Acme Inc.
                </a>
                <div className="flex flex-col gap-5">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl">
                                Welcome Back
                            </CardTitle>
                            <CardDescription>
                                Continue with your Google account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="grid gap-5">
                                        <GoogleAuthButton />
                                        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                            <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                                Or continue with
                                            </span>
                                        </div>
                                        <div className="space-y-2">
                                            {["email", "password"].map(
                                                (field) => (
                                                    <FormField
                                                        control={form.control}
                                                        key={field}
                                                        name={
                                                            field as keyof z.infer<
                                                                typeof signInSchema
                                                            >
                                                        }
                                                        render={({
                                                            field: fieldProps,
                                                        }) => (
                                                            <FormItem>
                                                                <FormLabel>
                                                                    {field
                                                                        .charAt(
                                                                            0,
                                                                        )
                                                                        .toUpperCase() +
                                                                        field.slice(
                                                                            1,
                                                                        )}
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Input
                                                                        type={
                                                                            field.includes(
                                                                                "password",
                                                                            )
                                                                                ? "password"
                                                                                : field ===
                                                                                    "email"
                                                                                  ? "email"
                                                                                  : "text"
                                                                        }
                                                                        placeholder=""
                                                                        {...fieldProps}
                                                                        autoComplete="off"
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                ),
                                            )}
                                        </div>
                                        <LoadingButton
                                            pending={pending}
                                        >
                                            Continue
                                            <HiOutlineArrowNarrowRight />

                                        </LoadingButton>
                                        <div className="text-center text-sm">
                                            Don't have an account?{" "}
                                            <Link
                                                href="/sign-up"
                                                className="underline underline-offset-4"
                                            >
                                                Sign Up
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                    <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
                        By clicking continue, you agree to our{" "}
                        <a href="#">Terms of Service</a> and{" "}
                        <a href="#">Privacy Policy</a>.
                    </div>
                </div>
            </div>
        </div>
    );
}
