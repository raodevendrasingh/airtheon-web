// books.ts
import { Hono } from "hono";

const app = new Hono()
    .get("/", (c) => c.json("list users"))
    .post("/", (c) => c.json("create a user", 201))
    .get("/:id", (c) => c.json(`get ${c.req.param("id")}`));

export default app;
