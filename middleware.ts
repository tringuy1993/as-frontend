import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authentication } from "next-firebase-auth-edge/lib/next/middleware";
import { authConfig } from "./config/server-config";

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
    // request.nextUrl.pathname.startsWith("/home") ||
    // request.nextUrl.pathname.startsWith("/greektime") ||
    // request.nextUrl.pathname.startsWith("/backtest") ||
    // request.nextUrl.pathname.startsWith("/signin")
    url.pathname === "/home" ||
    url.pathname === "/greektime" ||
    url.pathname === "/backtest" ||
    url.pathname === "/signin"
  ) {
  }

  return authentication(request, {
    ...authConfig,
    handleValidToken: async ({ token, decodedToken }) => {
      return NextResponse.next();
    },
    handleError: async (error) => {
      console.error("Unhandled authentication error", { error });
      return redirectToLogin(request);
    },
  });
}

export const config = {
  matcher: ["/", "/((?!_next/static|favicon.ico|logo.svg).*)"],
};
