import { signOut, getAuth } from "firebase/auth";

// import firebaseClient from "@/auth/firebaseClient";
// const auth = getAuth(firebaseClient);
export default async function handler(req, res) {
  if (req.method === "POST") {
    // signOut(auth);
    res.cookies.delete("AuthToken");
    res.cookies.delete("AuthToken.sig");
    console.log("SignOut");
  }
}
