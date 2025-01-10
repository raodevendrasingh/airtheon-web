import { Hono } from "hono";
import { handle } from "hono/vercel";
import waitlist from "./waitlist";
import uploadImage from "./upload-image";

export const runtime = "nodejs"; // or "edge"

const app = new Hono().basePath("/api");

const routes = app
    .route("/waitlist", waitlist)
    .route("/upload-image", uploadImage);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
