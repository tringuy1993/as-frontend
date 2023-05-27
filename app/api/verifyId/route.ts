import firebaseAdmin from "@/auth/firebaseAdmin";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");
  if (!token) return NextResponse.json({ validToken: false });
  try {
    const validToken = await firebaseAdmin.auth().verifyIdToken(token);
    // console.log("ValidToken?", validToken);
    return NextResponse.json({ validToken: validToken.uid !== null });
  } catch (e) {
    console.log("ERROR:", e);
    return NextResponse.json({ validToken: false });
  }
}
