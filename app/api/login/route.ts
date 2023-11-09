import initAuth from "@/auth/initAuth";
import { setAuthCookies } from "next-firebase-auth";

initAuth();

const handler = async (req, res) => {
  try {
    await setAuthCookies(req, res, "");
  } catch (e) {
    return res.status(500).json({ error: "Unexpected Eerror." });
  }

  return res.status(200).json({ status: true });
};

export { handler as GET, handler as POST };
