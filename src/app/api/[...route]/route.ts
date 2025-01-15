import { Hono } from "hono";
import { handle } from "hono/vercel";
import waitlist from "./waitlist";
import uploadImage from "./upload-image";
import onboard from "./onboard";

export const runtime = "nodejs"; // or "edge"

const app = new Hono().basePath("/api");

const routes = app
    .route("/waitlist", waitlist)
    .route("/upload-image", uploadImage)
    .route("/onboard", onboard);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
