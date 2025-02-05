import { Hono } from "hono";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { zValidator } from "@hono/zod-validator";
import { IconFileSchema } from "@/lib/app-schema";
import { auth } from "@/lib/auth";

const r2 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID!}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.CLOUDFLARE_R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY!,
    },
});

const app = new Hono<{ Bindings: CloudflareEnv }>().post(
    "/workplace-logo",
    zValidator("json", IconFileSchema),
    async (c) => {
        try {
            const session = await auth.api.getSession({
                headers: c.req.raw.headers,
            });

            const userId = session?.user?.id;

            if (!userId) {
                return c.json(
                    {
                        success: false,
                        message: "Invalid session",
                    },
                    401,
                );
            }

            const { buffer, fileName } = await c.req.json();

            // Convert base64 to buffer
            const base64Data = buffer.split(";base64,").pop();
            const fileBuffer = Buffer.from(base64Data, "base64");

            const fileExtension = fileName.split(".").pop();
            const uniqueFileName = `${Date.now()}-${fileName}`;
            const filePath = `workplace-logos/${uniqueFileName}`;

            const command = new PutObjectCommand({
                Bucket: "airtheon-assets",
                Key: filePath,
                Body: fileBuffer,
                ContentType: `image/${fileExtension}`,
            });

            await r2.send(command);

            const publicUrl = `${process.env.CLOUDFLARE_R2_PUBLIC_BUCKET_URL}/${filePath}`;

            return c.json({
                success: true,
                url: publicUrl,
            });
        } catch (error: any) {
            console.error("Upload failed:", error);
            return c.json({ success: false, error: error.message }, 500);
        }
    },
);

export default app;
