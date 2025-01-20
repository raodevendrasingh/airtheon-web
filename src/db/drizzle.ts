import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/db/schema/index";

export const db = drizzle(process.env.CLOUDFLARE_DATABASE_ID, {
    schema,
    logger: process.env.NODE_ENV === "development",
});
