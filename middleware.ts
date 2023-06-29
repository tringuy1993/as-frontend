import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authentication } from "next-firebase-auth-edge/lib/next/middleware";
import { authConfig } from "./config/server-config";
const PUBLIC_FILE = /\.(.*)$/;

function redirectToLogin(request: NextRequest) {
  if (
    request.nextUrl.pathname === "/signin" ||
    request.nextUrl.pathname === "/music" ||
    request.nextUrl.pathname === "/about"
  ) {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  url.pathname = "/signin";
  url.search = `redirect=${request.nextUrl.pathname}${url.search}`;
  return NextResponse.redirect(url);
}

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://www.alpha-seekers.com", "/https://alpha-seekers.com"]
    : ["http://localhost:3000"];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname === "/") {
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }

  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/signin") ||
    pathname.startsWith("/register") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const origin = request.headers.get("Origin");
  if (origin && !allowedOrigins.includes(origin)) {
    return new NextResponse(null, {
      status: 400,
      statusText: "Bad Request",
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }
  if (
    //Check if logged in to move forward
    request.nextUrl.pathname.startsWith("/home") ||
    request.nextUrl.pathname.startsWith("/greektime") ||
    request.nextUrl.pathname.startsWith("/backtest")
  ) {
    const authCookie = request.cookies.get("AuthToken");
    if (!authCookie) {
      console.log("Inside nonAuth", url.pathname);
      url.searchParams.set("redirect", url.pathname);
      request.nextUrl.pathname = "/signin";
      return NextResponse.redirect(request.nextUrl);
    }
    return authentication(request, {
      ...authConfig,
      handleValidToken: async ({ token, decodedToken }) => {
        // const url = request.nextUrl.clone();
        // return NextResponse.rewrite(new URL(url.pathname, request.url));
        return NextResponse.next();
      },
      handleError: async (error) => {
        console.error("Unhandled authentication error", { error });
        return redirectToLogin(request);
      },
    });
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!_next/static|favicon.ico|logo.svg).*)"],
};
