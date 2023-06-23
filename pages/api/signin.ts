import { authConfig, serverConfig } from "@/config/server-config";
import { NextApiRequest, NextApiResponse } from "next";
import { appendAuthCookiesApi } from "next-firebase-auth-edge/lib/next/cookies";
import { getFirebaseAuth } from "next-firebase-auth-edge/lib/auth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const bearerToken = req.headers["authorization"]?.split(" ")[1] ?? "";

  const { getCustomIdAndRefreshTokens } = getFirebaseAuth(
    {
      projectId: serverConfig.serviceAccount.projectId,
      privateKey: serverConfig.serviceAccount.privateKey,
      clientEmail: serverConfig.serviceAccount.clientEmail,
    },
    serverConfig.firebaseApiKey
  );

  const IdAndRefreshTokens = await getCustomIdAndRefreshTokens(
    bearerToken,
    serverConfig.firebaseApiKey
  );
  await appendAuthCookiesApi(res, IdAndRefreshTokens, authConfig);
  return res.status(200).json({ Success: "Successful signin" });
}
