import { AuthenticationOptions } from "next-firebase-auth-edge/lib/next/middleware";

export const serverConfig = {
  useSecureCookies: true,
  firebaseApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  serviceAccount: {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
  },
};

export const authConfig: AuthenticationOptions = {
  loginPath: "/api/signin",
  logoutPath: "/api/logout",
  apiKey: serverConfig.firebaseApiKey,
  cookieName: "AuthToken",
  cookieSignatureKeys: ["secret1", "secret2"],
  cookieSerializeOptions: {
    path: "/",
    httpOnly: true,
    secure: serverConfig.useSecureCookies, // Set this to true on HTTPS environments
    sameSite: "lax" as const,
    maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
    // maxAge: 60,
  },
  serviceAccount: serverConfig.serviceAccount,
};
