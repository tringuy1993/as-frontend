// pages/api/refresh-tokens.ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { refreshAuthCookies } from "next-firebase-auth-edge/lib/next/cookies";
import { authConfig, serverConfig } from "@/config/server-config";
import { NextApiRequest, NextApiResponse } from "next";
// import { getFirebaseAuth } from "next-firebase-auth-edge/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers["authorization"]?.split(" ")[1] ?? "";

  // ...use bearer token to update custom claims using "firebase-admin" library and then:
  console.log(`Refreshing Token , ${bearerToken}`);
  const { idToken, refreshToken } = await refreshAuthCookies(bearerToken, res, {
    serviceAccount: serverConfig.serviceAccount,
    apiKey: serverConfig.firebaseApiKey,
    cookieName: authConfig.cookieName,
    cookieSignatureKeys: authConfig.cookieSignatureKeys,
    cookieSerializeOptions: authConfig.cookieSerializeOptions,
  });

  console.log("Refreshing Token");
  // Optionally do something with new `idToken` and `refreshToken`

  res.status(200).json({ idToken: idToken, refreshToken: refreshToken });
}
