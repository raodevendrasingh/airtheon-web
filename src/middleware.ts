"use server";

import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import type { Session } from "@/lib/auth";

const publicRoutes = [
    "/",
    "/sign-in",
    "/sign-up",
    "/verify",
    "/reset-password",
    "/forgot-password",
];

const privateRoutes = [
    "/search/*",
    "/dash",
    "/settings",
    "/trash",
    "/plugins",
    "/archives",
    "/notifications",
    "/history/*",
    "/space/*",
];
const adminRoutes = ["/admin"];

export async function middleware(request: NextRequest) {
    const pathName = request.nextUrl.pathname;

    const isPublicRoute = publicRoutes.includes(pathName);
    const isPrivateRoute = privateRoutes.some((route) => {
        return route.endsWith("/*")
            ? pathName.startsWith(route.slice(0, -2))
            : pathName === route;
    });
    const isAdminRoute = adminRoutes.includes(pathName);

    const { data: session } = await betterFetch<Session>(
        "/api/auth/get-session",
        {
            baseURL: process.env.BETTER_AUTH_URL!,
            headers: {
                cookie: request.headers.get("cookie") || "",
            },
        },
    );

    if (!session) {
        if (isPublicRoute) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (isPublicRoute) {
        return NextResponse.redirect(new URL("/dash", request.url));
    }

    if (isAdminRoute && session.user.role !== "admin") {
        return NextResponse.redirect(new URL("/dash", request.url));
    }

    if (isPrivateRoute) {
        return NextResponse.next();
    }

    return NextResponse.redirect(new URL("/dash", request.url));
}

export const config = {
    matcher:
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
};
