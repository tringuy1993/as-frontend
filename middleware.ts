import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  authentication,
  refreshAuthCookies,
} from "next-firebase-auth-edge/lib/next/middleware";
import { authConfig } from "./config/server-config";
import { getFirebaseAuth } from "next-firebase-auth-edge/lib/auth";

function redirectToLogin(request: NextRequest) {
  if (request.nextUrl.pathname === "/signin") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/signin";
  url.search = `redirect=${request.nextUrl.pathname}${url.search}`;
  return NextResponse.redirect(url);
}

const { setCustomUserClaims, getUser } = getFirebaseAuth(
  authConfig.serviceAccount,
  authConfig.apiKey
);

export async function middleware(request: NextRequest) {
  console.log("Middleware??");
  return authentication(request, {
    loginPath: "/api/signin",
    logoutPath: "/api/logout",
    ...authConfig,
    handleValidToken: async ({ token, decodedToken }) => {
      return NextResponse.next();
    },
    handleInvalidToken: async () => {
      return redirectToLogin(request);
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
