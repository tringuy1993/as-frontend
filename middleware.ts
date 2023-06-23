import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { authentication } from "next-firebase-auth-edge/lib/next/middleware";
import { authConfig, serverConfig } from "./config/server-config";
import { getFirebaseAuth } from "next-firebase-auth-edge/lib/auth";

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

const { verifyIdToken } = getFirebaseAuth(
  {
    projectId: serverConfig.serviceAccount.projectId,
    privateKey: serverConfig.serviceAccount.privateKey,
    clientEmail: serverConfig.serviceAccount.clientEmail,
  },
  serverConfig.firebaseApiKey
);

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
    url.pathname === "/backtest"
  ) {
    // const authCookie = request.cookies.get("AuthToken");
    // console.log(url.pathname);
    // if (!authCookie) {
    //   // request.nextUrl.pathname = "/signin";
    //   // return NextResponse.redirect(request.nextUrl);
    //   console.log("Inside nonAuth", url.pathname);
    //   url.searchParams.set("redirect", url.pathname);
    //   request.nextUrl.pathname = "/signin";
    //   return NextResponse.redirect(request.nextUrl);
    // }
    // return authentication(request, {
    //   ...authConfig,
    //   handleValidToken: async ({ token, decodedToken }) => {
    //     console.log("Valid Token");
    //     return NextResponse.next();
    //     // request.nextUrl.pathname = url.pathname;
    //     // return NextResponse.redirect(request.nextUrl);
    //   },
    //   handleInvalidToken: async () => {
    //     const url = request.nextUrl.clone();
    //     url.pathname = "/signin";
    //     url.search = `redirect=${request.nextUrl.pathname}${url.search}`;
    //     return NextResponse.redirect(url);
    //   },
    //   handleError: async (error) => {
    //     console.error("Unhandled authentication error", { error });
    //     return redirectToLogin(request);
    //   },
    // });
  }

  return authentication(request, {
    ...authConfig,
    handleValidToken: async ({ token, decodedToken }) => {
      const url = request.nextUrl.clone();
      console.log("ValidToken Path", url.pathname);

      return NextResponse.rewrite(new URL(url.pathname, request.url));
      return NextResponse.next();
      // request.nextUrl.pathname = url.pathname;
      // return NextResponse.redirect(request.nextUrl);
    },
    handleInvalidToken: async () => {
      console.log("Not Valid Token");
      console.log(url.pathname);
      if (
        url.pathname == "/home" ||
        url.pathname == "/greektime" ||
        url.pathname == "/backtest"
      ) {
        url.searchParams.set("redirect", url.pathname);
        request.nextUrl.pathname = "/signin";
        return NextResponse.redirect(request.nextUrl);
      }
      return NextResponse.next();
    },
    handleError: async (error) => {
      console.error("Unhandled authentication error", { error });
      return redirectToLogin(request);
    },
  });
  // return NextResponse.next();
}

export const config = {
  matcher: ["/", "/((?!_next/static|favicon.ico|logo.svg).*)"],
};
