"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { LoadingButton } from "./LoadingButton";
import { MoveRight } from "lucide-react";
import { onboardingFormSchema, OnboardingFormValues } from "@/lib/app-schema";
import { authClient, useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";
import {
    personalisationQuestions,
    Question,
} from "@/data/personalization-options";
import { omit } from "lodash";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { SpotlightButton } from "@/components/ui/spotlight-button";
import { IconData, IconPicker } from "@/components/icon-picker/icon-picker";
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OnboardApiResponse } from "@/types/ApiResponse";
import { z } from "zod";

export const OnboardingDialog = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
    const [iconData, setIconData] = useState<IconData | null>(null);
    const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
    const [pending, setPending] = useState<boolean>(false);
    const { data: session, isPending } = useSession();

    const form = useForm<z.infer<typeof onboardingFormSchema>>({
        resolver: zodResolver(onboardingFormSchema),
        defaultValues: {
            workplaceName: "",
            responses: Object.fromEntries(
                personalisationQuestions.map((q) => [
                    q.quesId,
                    q.type === "checkbox" ? [] : "",
                ]),
            ),
            otherInputs: {},
        },
    });

    const { workplaceName } = form.watch();

    useEffect(() => {
        if (!session) return;
        if (isPending) return;

        const checkOnboarding = async () => {
            try {
                const response = await fetch(
                    `/api/onboard/status?userId=${session.user.id}`,
                );
                const data = (await response.json()) as OnboardApiResponse;
                setIsOnboarded(data.isOnboarded);
            } catch (error) {
                console.error("Error checking onboarding status:", error);
            }
        };
        checkOnboarding();
    }, [session]);

    if (!session) {
        return <div>Not signed in</div>;
    }

    const handleNext = () => {
        if (currentQuestionIndex < personalisationQuestions.length) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handleImageUpload = async (imageData: IconData) => {
        try {
            const url = `/api/upload-image/workplace-logo`;
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(imageData),
            });
            if (!response.ok) {
                throw new Error(`Image upload failed: ${response.statusText}`);
            }
            const data = (await response.json()) as { url: string };
            return data.url;
        } catch (error) {
            console.error("Error uploading image", error);
        }
    };

    const onSubmit = async (formData: OnboardingFormValues) => {
        setPending(true);
        try {
            let imageUrl;
            if (iconData?.type === "image") {
                imageUrl = await handleImageUpload(iconData);
            }

            const newIconData = iconData && {
                ...omit(iconData, "buffer"),
            };

            const randomDigits = Math.floor(Math.random() * 1000000);
            const newSlug = `${formData.workplaceName.toLowerCase().replace(/\s/g, "-")}-${randomDigits}`;

            // create organization
            await authClient.organization.create({
                name: formData.workplaceName,
                slug: newSlug,
                logo: imageUrl,
                metadata: {
                    icon: newIconData,
                },
            });

            // set organization active
            await authClient.organization.setActive({
                organizationSlug: newSlug,
            });

            // send formdata to backend
            const response = await fetch("/api/onboard", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                setIsOnboarded(true);
            }
        } catch (error: any) {
            console.error("Error: ", error.response.data);
        } finally {
            setPending(false);
        }
    };

    const renderQuestion = (question: Question) => {
        return (
            <FormField
                control={form.control}
                name={`responses.${question.quesId}`}
                render={({ field }) => (
                    <FormItem>
                        <div
                            className={
                                question.display === "stacked"
                                    ? "space-y-3"
                                    : "flex flex-wrap gap-2"
                            }
                        >
                            {question.options.map((option) => (
                                <div
                                    key={option.id}
                                    className={`flex items-center space-x-2 border border-border rounded-xl p-3 cursor-pointer ${
                                        question.type === "checkbox"
                                            ? (
                                                  field.value as string[]
                                              )?.includes(option.id)
                                                ? "bg-lime-400/10 border-lime-600"
                                                : ""
                                            : field.value === option.id
                                              ? "bg-lime-400/10 border-lime-600"
                                              : ""
                                    }`}
                                >
                                    {question.type === "checkbox" ? (
                                        <FormControl>
                                            <Checkbox
                                                className=""
                                                checked={(
                                                    field.value as string[]
                                                )?.includes(option.id)}
                                                onCheckedChange={(checked) => {
                                                    const currentValues =
                                                        (field.value as string[]) ||
                                                        [];
                                                    const newValues = checked
                                                        ? [
                                                              ...currentValues,
                                                              option.id,
                                                          ]
                                                        : currentValues.filter(
                                                              (id) =>
                                                                  id !==
                                                                  option.id,
                                                          );
                                                    field.onChange(newValues);
                                                }}
                                            />
                                        </FormControl>
                                    ) : (
                                        <FormControl>
                                            <RadioGroup
                                                value={field.value as string}
                                                onValueChange={field.onChange}
                                            >
                                                <RadioGroupItem
                                                    value={option.id}
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    )}
                                    <Label className="flex items-center space-x-2">
                                        {option.icon && (
                                            <option.icon className="w-4 h-4" />
                                        )}
                                        <span>{option.label}</span>
                                    </Label>
                                </div>
                            ))}
                        </div>

                        {question.allowOther &&
                            (field.value as string[])?.includes("other") && (
                                <FormField
                                    control={form.control}
                                    name={`otherInputs.${question.quesId}`}
                                    render={({ field: otherField }) => (
                                        <Input
                                            className="mt-4 rounded-lg h-10"
                                            placeholder="Please specify"
                                            {...otherField}
                                        />
                                    )}
                                />
                            )}
                    </FormItem>
                )}
            />
        );
    };

    // Welcome and final screen
    const renderScreen = () => {
        if (currentQuestionIndex === -1) {
            return (
                <motion.div className="h-[256px] flex flex-col items-center justify-between">
                    <DialogHeader>
                        <DialogTitle className="text-3xl text-center tracking-normal">
                            Welcome to Airtheon! 👋
                        </DialogTitle>
                        <p className="text-center text-muted-foreground pt-4">
                            Let's personalize your experience in just a few
                            steps
                        </p>
                    </DialogHeader>
                    <DialogFooter className="flex items-center justify-center">
                        <SpotlightButton
                            onClick={() => setCurrentQuestionIndex(0)}
                            className="mx-auto flex items-center justify-center"
                        >
                            Get Started
                            <MoveRight className="ml-2 h-4 w-4" />
                        </SpotlightButton>
                    </DialogFooter>
                </motion.div>
            );
        }

        // final screen
        if (currentQuestionIndex >= personalisationQuestions.length) {
            return (
                <motion.div>
                    <DialogHeader>
                        <DialogTitle className="text-2xl text-center tracking-normal">
                            Set Up Your Workplace
                        </DialogTitle>
                        <p className="text-center text-muted-foreground dark:text-lime-400 pt-4">
                            Lets give your workplace a name and icon
                        </p>
                    </DialogHeader>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full py-8">
                        <IconPicker onIconSelect={setIconData} />
                        <div className="py-4 w-full sm:w-[80%]">
                            <FormField
                                control={form.control}
                                name="workplaceName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                className="h-12 w-full text-base md:text-base rounded-xl"
                                                placeholder="Enter workplace name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex flex-col-reverse sm:flex-row items-center gap-3 w-full">
                        <LoadingButton
                            pending={pending}
                            form="onboarding-form"
                            className="w-full sm:w-1/2"
                            disabled={!workplaceName.trim() || !iconData}
                        >
                            Create Workplace
                        </LoadingButton>
                    </DialogFooter>
                </motion.div>
            );
        }

        // Render actual questions
        const currentQuestion = personalisationQuestions[currentQuestionIndex];
        return (
            <motion.div>
                <DialogHeader>
                    <DialogTitle className="text-xl leading-relaxed tracking-normal">
                        {currentQuestion.question.split("?")[0]}
                        <span className="text-lime-400">?</span>
                    </DialogTitle>
                </DialogHeader>

                <div className="py-4">{renderQuestion(currentQuestion)}</div>

                <DialogFooter className="flex justify-end gap-3 w-full ">
                    <Button
                        onClick={handleNext}
                        disabled={
                            !form.getValues(
                                `responses.${currentQuestion.quesId}`,
                            )
                        }
                        className="w-1/2"
                    >
                        Next <ArrowRight className="ml-2" />
                    </Button>
                </DialogFooter>
            </motion.div>
        );
    };

    return (
        <Dialog open={isOnboarded === false && !isPending && session !== null}>
            <Form {...form}>
                <form
                    id="onboarding-form"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <DialogContent
                        aria-label="Onboarding"
                        hideCloseButton
                        aria-describedby={undefined}
                        className="p-8 bg-white dark:bg-accent/50"
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestionIndex}
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -50, opacity: 0 }}
                                transition={{
                                    duration: 0.3,
                                    ease: "easeInOut",
                                }}
                            >
                                {renderScreen()}
                            </motion.div>
                        </AnimatePresence>
                    </DialogContent>
                </form>
            </Form>
        </Dialog>
    );
};
