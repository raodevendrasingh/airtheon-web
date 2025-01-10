import { z } from "zod";

export const IconFileSchema = z.object({
    fileName: z.string(),
    type: z.enum(["icon", "emoji", "image"]),
    preview: z.string(),
    buffer: z.any().transform((val) => {
        if (val instanceof ArrayBuffer) {
            return Buffer.from(new Uint8Array(val));
        }
        if (typeof val === "string") {
            return Buffer.from(val.split(",")[1], "base64");
        }
        return val;
    }),
});
