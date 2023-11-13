import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "../../../config/server-config";
import { setAuthCookies } from "next-firebase-auth-edge/lib/next/cookies";


export async function GET(request: NextRequest) {
    console.log("Get /api/login")
    const setAuthResult = await setAuthCookies(request.headers, authConfig)
    return setAuthResult
}
