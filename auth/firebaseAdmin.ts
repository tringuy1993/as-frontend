import admin from "firebase-admin";
const privateKey = process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY.replace(
  /\\n/g,
  "\n"
);
const clientEmail = process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

if (!privateKey || !clientEmail || !projectId) {
  console.log(
    `Failed to load Firebase credentials. Follow the instructions in the README to set your Firebase credentials inside environment variables.`
  );
}

const config = {
  credential: admin.credential.cert({
    projectId: projectId,
    clientEmail: clientEmail,
    privateKey: privateKey,
  }),
};
let firebaseAdmin;

if (!admin.apps.length) {
  firebaseAdmin = admin.initializeApp(config);
} else {
  firebaseAdmin = admin.app();
}

export default firebaseAdmin;
