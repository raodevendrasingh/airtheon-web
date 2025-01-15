"use server";

import WaitlistTemplate from "@/utils/emails/waitlist";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendWaitlistConfirmationEmail({
    email,
}: {
    email: string;
}) {
    try {
        const { data, error } = await resend.emails.send({
            from: "Airtheon <hello@airtheon.com>",
            to: email,
            subject: "Your spot has been reserved",
            react: WaitlistTemplate(),
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
