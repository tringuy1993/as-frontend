// import { serverConfig } from "@/config/server-config";
import { serverConfig } from "@/config/server-config";
import admin, { app, AppOptions } from "firebase-admin";

const config: AppOptions = {
  credential: admin.credential.cert(serverConfig.serviceAccount),
};

let firebaseAdmin: app.App;
if (!admin.apps.length) {
  firebaseAdmin = admin.initializeApp(config);
} else {
  firebaseAdmin = admin.app();
}

export default firebaseAdmin;
