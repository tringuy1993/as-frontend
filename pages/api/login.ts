import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import firebaseClient from "@/auth/firebaseClient";
import { serialize } from "cookie";

const auth = getAuth(firebaseClient);

export default async function handler(req, res) {
  if (req.method === "POST") {
    console.log(req.body);

    const isUser = await signInWithEmailAndPassword(
      auth,
      req.body.email,
      req.body.password
    );

    if (isUser) {
      // cookies().set("AuthToken", )
      const idToken = await isUser.user.getIdToken().then((idToken) => {
        return idToken;
      });

      res.setHeader(
        "Set-Cookie",
        serialize("AuthToken", idToken, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
      );
      res.status(201);
      res.json({});
    } else {
      res.status(402);
      res.json({});
    }
    // console.log(test);
    // res.status(200).json(req.body);
  }
}
