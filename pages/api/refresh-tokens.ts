import type { NextApiRequest, NextApiResponse } from "next";
import { refreshAuthCookies } from "next-firebase-auth-edge/lib/next/cookies";
import { authConfig } from "../../config/server-config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers["authorization"]?.split(" ")[1] ?? "";
  // ...use bearer token to update custom claims using "firebase-admin" library and then:

  const { idToken, refreshToken } = await refreshAuthCookies(
    bearerToken,
    res,
    authConfig
  );

  // Optionally do something with new `idToken` and `refreshToken`

  res.status(200).json({ NewIdToken: idToken });
}

// export {handler as GET, handler as POST};
