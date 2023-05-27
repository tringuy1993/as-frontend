// Import the functions you need from the SDKs you need
import { clientConfig } from "@/config/client-config";
import { initializeApp, getApps } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

let firebaseClient =
  getApps().length === 0 ? initializeApp(clientConfig) : getApps()[0];
export default firebaseClient;
