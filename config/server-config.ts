export const serverConfig = {
  useSecureCookies: "false",
  firebaseApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  serviceAccount: {
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL!,
    privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY!.replace(
      /\\n/g,
      "\n"
    ),
  },
};

export const authConfig = {
  apiKey: serverConfig.firebaseApiKey,
  cookieName: "AuthToken",
  cookieSignatureKeys: ["secret1", "secret2"],
  cookieSerializeOptions: {
    path: "/",
    httpOnly: true,
    secure: serverConfig.useSecureCookies, // Set this to true on HTTPS environments
    sameSite: "lax" as const,
    maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
  },
  serviceAccount: serverConfig.serviceAccount,
};
