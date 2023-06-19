import { signOut, getAuth } from "firebase/auth";
// import firebase_app from "./firebase_config";
import firebaseClient from "@/auth/firebaseClient";
import { serialize } from "cookie";
// import { cookies } from "next/headers";

const auth = getAuth(firebaseClient);

export default async function handler(req, res) {
  if (req.method === "POST") {
    signOut(auth);
    res.cookies.delete("ASAuthToken");
    console.log("SignOut");
    //   res.setHeader(
    //     "Set-Cookie",
    //     serialize("ASAuthToken", null, {})
    //   );
    //   res.status(201);
    //   res.json({});
    // } else {
    //   res.status(402);
    //   res.json({});
    // }
  }
}
