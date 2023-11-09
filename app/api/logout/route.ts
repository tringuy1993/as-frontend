import { unsetAuthCookies } from "next-firebase-auth";

import initAuth from "@/auth/initAuth";

initAuth();

const handler = async (req, res) => {
  try {
    await unsetAuthCookies(req, res);
  } catch (e) {
    console.error(e);

    return res.status(500).json({ error: "LogOUT Unexpected Error." });
  }

  return res.status(200).json({ status: true });
};

export { handler as GET, handler as POST };
