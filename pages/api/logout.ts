import { setCookie } from "cookies-next";

export default async function handler(req, res) {
  if (req.method === "GET") {
    setCookie("AuthToken", "", { req, res, maxAge: 0 });
    setCookie("AuthToken.sig", "", { req, res, maxAge: 0 });

    res.status(201).json({ Success: "SignOut" });
  }
}
