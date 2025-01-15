"use server";

import { EmailTemplate } from "@/utils/email-otp";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendVerificationEmail({
    email,
    otp,
}: {
    email: string;
    otp: string;
}) {
    try {
        const { data, error } = await resend.emails.send({
            from: "Airtheon <no-reply@airtheon.com>",
            to: email,
            subject: "Airtheon | Verify Your Email",
            react: EmailTemplate({ email, otp }),
        });
        if (error) {
            console.error("Resend error:", error);
            throw new Error("Failed to send verification email");
        }
        return { success: true };
    } catch (error) {
        console.error("Failed to send verification email:", error);
        throw error;
    }
}
