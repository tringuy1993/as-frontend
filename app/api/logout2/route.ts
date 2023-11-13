import { NextRequest } from "next/server";
import { authConfig } from "../../../config/server-config";
import { removeAuthCookies } from "next-firebase-auth-edge/lib/next/cookies";

export async function GET(request: NextRequest) {
  console.log("Get /api/logout");
  return removeAuthCookies(request.headers, authConfig);
}
