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
