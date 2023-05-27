import { NextResponse } from "next/server";
const PUBLIC_FILE = /\.(.*)$/;

const protected_Path = ["/home", "/greektime", "/backtest"];
const idToken = process.env.NEXT_PUBLIC_COOKIE_NAME;
export default async function middleware(request) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();
  if (url.pathname === "/") {
    url.pathname = "/home";
    return NextResponse.redirect(url);
  }
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
  if (
    request.nextUrl.pathname.startsWith("/home") ||
    request.nextUrl.pathname.startsWith("/greektime") ||
    request.nextUrl.pathname.startsWith("/backtest") ||
    request.nextUrl.pathname.startsWith("/signin")
  ) {
    const authCookie = request.cookies.get(idToken);
    const params = new URLSearchParams({
      token: authCookie?.value ?? "",
    });
    if (!authCookie) {
      return NextResponse.rewrite(new URL("/signin", request.url));
    }

    try {
      const res = await fetch(
        `http://localhost:3000/api/verifyId?` + params.toString()
      );
      const json = await res.json();
      const validToken = json.validToken;
      console.log("MiddleWare:", validToken);

      if (validToken == false) {
        return NextResponse.rewrite(new URL("/signin", request.url));
      } else {
        return NextResponse.next();
      }
    } catch (e) {
      console.log(e);
    }
  }
}
