import { getCookies } from "cookies-next";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const cookie = getCookies({ req, res });
    console.log(cookie);

    res.status(201).json(cookie.AuthToken);
  }
}
