// aws-email.ts
import { Hono } from "hono";
import { signAWSRequest } from "@/utils/aws-signer";

const app = new Hono().post("/waitlist/:email", async (c) => {
    const email = c.req.param("email");

    const sesPayload = new URLSearchParams({
        Action: "SendEmail",
        Version: "2010-12-01",
        Source: `"Airtheon" <${process.env.AWS_SES_SENDER!}>`,
        "Destination.ToAddresses.member.1": email,
        "Message.Subject.Data": "Your spot on our waitlist is confirmed! 🎉",
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
            console.error("Error response from SES:", errorText);
            return c.json(
                { error: "Failed to send email", details: errorText },
                500,
            );
        }

        return c.json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error sending email:", error);
        return c.json({ error: "Failed to send email" }, 500);
    }
});

export default app;
