import { Hono } from "hono";
import { signAWSRequest } from "@/utils/aws-signer";

const app = new Hono()
    .post("/waitlist", async (c) => {
        const { email }: { email: string } = await c.req.json();

        const sesPayload = new URLSearchParams({
            Action: "SendEmail",
            Version: "2010-12-01",
            Source: `"Airtheon" <${process.env.AWS_SES_SENDER!}>`,
            "Destination.ToAddresses.member.1": email,
            "Message.Subject.Data":
                "Your spot on our waitlist is confirmed! 🎉",
            "Message.Body.Text.Data":
                "Thank you for joining our waitlist! We're thrilled to have you as part of our growing community.",
        }).toString();

        const region = process.env.AWS_REGION!;
        const service = "ses";
        const url = `https://email.${region}.amazonaws.com/`;

        try {
            const headers = await signAWSRequest({
                method: "POST",
                url,
                region,
                service,
                body: sesPayload,
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            });

            const response = await fetch(url, {
                method: "POST",
                headers,
                body: sesPayload,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(
                    "Error response from SES in waitlist email:",
                    errorText,
                );
                return c.json(
                    {
                        error: "Failed to send waitlist email",
                        details: errorText,
                    },
                    500,
                );
            }

            return c.json({ message: "Waitlist email sent successfully" });
        } catch (error) {
            console.error("Error sending waitlst email:", error);
            return c.json({ error: "Failed to send waitlist email" }, 500);
        }
    })
    .post("/verify", async (c) => {
        const { email, otp }: { email: string; otp: string } =
            await c.req.json();

        const sesPayload = new URLSearchParams({
            Action: "SendEmail",
            Version: "2010-12-01",
            Source: `"Airtheon" <${process.env.AWS_SES_SENDER!}>`,
            "Destination.ToAddresses.member.1": email,
            "Message.Subject.Data": "Airtheon | Verify Your Email",
            "Message.Body.Text.Data": `Thank you for signin up! Please use the following verification code to verify your email address: ${otp}`,
        }).toString();

        const region = process.env.AWS_REGION!;
        const service = "ses";
        const url = `https://email.${region}.amazonaws.com/`;

        try {
            const headers = await signAWSRequest({
                method: "POST",
                url,
                region,
                service,
                body: sesPayload,
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            });

            const response = await fetch(url, {
                method: "POST",
                headers,
                body: sesPayload,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(
                    "Error response from SES in email verification:",
                    errorText,
                );
                return c.json(
                    {
                        error: "Failed to send verfication email",
                        details: errorText,
                    },
                    500,
                );
            }

            return c.json({ message: "Verification email sent successfully" });
        } catch (error) {
            console.error("Error sending verification email:", error);
            return c.json({ error: "Failed to send verification email" }, 500);
        }
    });

export default app;
