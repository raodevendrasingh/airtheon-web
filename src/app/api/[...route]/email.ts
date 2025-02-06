import { Hono } from "hono";
import { Resend } from "resend";
import WaitlistTemplate from "@/utils/emails/waitlist";
import { EmailTemplate } from "@/utils/email-otp";

const resend = new Resend(process.env.RESEND_API_KEY!);

const app = new Hono()
    .get("/waitlist/:email", async (c) => {
        try {
            const email = c.req.param("email") as string;

            const { data, error } = await resend.emails.send({
                from: "Airtheon <hello@airtheon.com>",
                to: email,
                subject: "Your spot has been reserved",
                react: WaitlistTemplate(),
            });

            if (error) {
                console.error("Resend error:", error);
                throw new Error("Failed to send confirmation email");
            }
            return c.json(
                {
                    success: true,
                    message: "Waitlist Confirmation Email Sent Successfully",
                },
                200,
            );
        } catch (error) {
            console.error("Failed to send confirmation email:", error);
            return c.json({ success: false, message: error }, 500);
        }
    })
    .get("/verify/:email/:otp", async (c) => {
        try {
            const email = c.req.param("email") as string;
            const otp = c.req.param("otp") as string;

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
            return c.json(
                {
                    success: true,
                    message: "Verification Email Sent Successfully",
                },
                200,
            );
        } catch (error) {
            console.error("Failed to send verification email:", error);
            return c.json({ success: false, message: error }, 500);
        }
    });

export default app;
