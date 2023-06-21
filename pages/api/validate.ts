import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   if (req.query.secret !== process.env.TEST) {
  //     return res.status(401).json({ message: "invalid token" });
  //   }
  console.log(req.query.secret);
  console.log(process.env.TEST);
  const test = process.env.TEST;
  console.log(test);
  return res.status(401).json({ message: `${test}` });
}
