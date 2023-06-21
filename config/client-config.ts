// export const env = process.env;
const test = "NEXT_REPUBLIC_REDIRECT_URL";
const test2 = "NEXT_PUBLIC_FIREBASE_API_KEY";
const test3 = "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN";
const test4 = "NEXT_PUBLIC_FIREBASE_PROJECT_ID";
const test5 = "NEXT_PUBLIC_FIREBASE_APP_ID";
const test6 = "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID";
const test7 = "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID";

export const clientConfig = {
  // redicrectUrl: process.env.NEXT_REPUBLIC_REDIRECT_URL!,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  // apiKey: process.env.apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID!,
};

// export const clientConfig = {
//   redicrectUrl: process.env[test],
//   apiKey: process.env[test2],
//   authDomain: process.env[test3],
//   projectId: process.env[test4],
//   appId: process.env[test5],
//   messagingSenderId: process.env[test6],
//   measurementId: process.env[test7],
//   test: "Name",
// };
