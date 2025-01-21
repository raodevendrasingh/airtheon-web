import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const runtime = "edge";

export const { POST, GET } = toNextJsHandler(auth);
