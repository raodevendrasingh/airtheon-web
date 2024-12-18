import { drizzle, DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "./schema";

interface Env {
    DB: DrizzleD1Database;
}

export function createD1Client(env: Env) {
    return drizzle(env.DB, { schema });
}
