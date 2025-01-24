import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    const url = new URL("/api/auth/get-session", request.nextUrl.origin)

    const response = await fetch(url, {
        headers: {
            cookie: request.headers.get("cookie") || "",
        },
    })

    const session = await response.json()

    // Redirect if user is not logged in and tries to access the dashboard
    if (pathname.startsWith("/dashboard") && !session) {
        return NextResponse.redirect(new URL("/", request.nextUrl.origin))
    }

    // Redirect if user is logged in and tries to access the homepage
    if (pathname === "/" && session) {
        return NextResponse.redirect(
            new URL("/dashboard", request.nextUrl.origin),
        )
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
    ],
}
