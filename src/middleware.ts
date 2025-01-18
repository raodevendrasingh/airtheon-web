"use server";

import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { Session } from "@/lib/auth";
import { env } from "@/env";

const privateRoutes = [
    "/search/*",
    "/dash",
    "/settings/*",
    "/trash",
    "/plugins",
    "/archives",
    "/notifications",
    "/history/*",
    "/space/*",
];

const authRoutes = ["/sign-in", "/sign-up", "/verify"];

const adminRoutes = ["/admin"];

export async function middleware(request: NextRequest) {
    const { data: session } = await betterFetch<Session>(
        "/api/auth/get-session",
        {
            baseURL: env.NEXT_PUBLIC_BASE_URL!,
            headers: {
                cookie: request.headers.get("cookie") || "",
            },
        },
    );

    // const session = await fetch(
    //     `${env.NEXT_PUBLIC_BASE_URL}/api/auth/get-session`,
    //     {
    //         headers: {
    //             cookie: request.headers.get("cookie") || "",
    //         },
    //     },
    // ).then((res) => res.json() as Promise<Session>);

    const pathName = request.nextUrl.pathname;
    const hostname = request.headers.get("host");

    const baseDomain = env.NEXT_PUBLIC_BASE_DOMAIN;

    const isAdminRoute = adminRoutes.includes(pathName);
    const isAuthRoute = authRoutes.includes(pathName);
    const isPrivateRoute = privateRoutes.some((route) => {
        return route.endsWith("/*")
            ? pathName.startsWith(route.slice(0, -2))
            : pathName === route;
    });

    // Check if the host is not localhost
    // const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";

    // If not localhost, restrict access to private and auth routes
    // if (!isLocalhost) {
    //     if (isPrivateRoute || isAuthRoute) {
    //         return NextResponse.rewrite(new URL("/not-found", request.url));
    //     }
    // }

    if (pathName.startsWith("/legal") && hostname === baseDomain) {
        return NextResponse.rewrite(new URL("/not-found", request.url));
    }

    if (hostname?.startsWith("help.")) {
        if (!pathName.startsWith("/legal")) {
            return NextResponse.redirect(new URL("/legal", request.url));
        }
        return NextResponse.next();
    }

    if (isPrivateRoute || isAdminRoute) {
        if (!session) {
            return NextResponse.redirect(new URL("/sign-in", request.url));
        }

        // if (isAdminRoute && !session.user.role.includes("admin")) {
        //     return NextResponse.redirect(new URL("/dash", request.url));
        // }
    }

    if (isAuthRoute) {
        if (session) {
            return NextResponse.redirect(new URL("/dash", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher:
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
};
