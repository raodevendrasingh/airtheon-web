import { Hono } from "hono";
import { handle } from "hono/vercel";
import users from "./users";

export const runtime = "edge"; // or "nodejs"

const app = new Hono().basePath("/api");

const routes = app.route("/users", users);

export const GET = handle(app);
export const POST = handle(app);

export type AppType = typeof routes;
