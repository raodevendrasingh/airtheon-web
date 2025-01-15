import { z } from "zod";

export const IconFileSchema = z.object({
    fileName: z.string().optional(),
    type: z.enum(["icon", "emoji", "image"]),
    preview: z.string(),
    buffer: z.any().optional(),
    url: z.string().optional(),
});

export const onboardingFormSchema = z.object({
    workplaceName: z.string().min(4, "Name must be at least 4 characters"),
    responses: z.record(z.union([z.string(), z.array(z.string())])),
    otherInputs: z.record(z.string()).optional(),
});

export type OnboardingFormValues = z.infer<typeof onboardingFormSchema>;
