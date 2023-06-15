"use client";
import { createContext, useState, useContext, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  getAuth,
} from "firebase/auth";
import { useRouter } from "next/navigation";
// import firebase_app from "./firebase_config";
import firebaseClient from "@/auth/firebaseClient";
import { setCookie, deleteCookie } from "cookies-next";

const idToken = process.env.NEXT_PUBLIC_COOKIE_NAME;
const auth = getAuth(firebaseClient);
export const FBAuthContext = createContext({});

export const useFBAuth = () => useContext(FBAuthContext);

export const FBAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [pending, setPending] = useState(true);

  // https://reacthustle.com/blog/nextjs-redirect-after-login
  const router = useRouter();

  async function loginUser(e) {
    await signInWithEmailAndPassword(auth, e.email, e.password)
      .then(() => router.replace("/home"))
      .catch((error) => {
        console.log(error);
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          setErrMsg("Incorrect User or Password");
        } else {
          setErrMsg(error.code);
        }
      });
  }

  let logoutUser = () => {
    signOut(auth);
    deleteCookie(idToken);
    setUser(null);
    router.push("/signin");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const token = await currentUser?.getIdToken();
        setCookie(idToken, token);
        setUser(() => {
          return currentUser;
        });
      } else {
        () => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          logoutUser();
        };
      }
      setPending(false);
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      if (auth.currentUser) await auth.currentUser.getIdToken(true);
      // console.log("update token with:", user);
    }, 55 * 60 * 1000);
    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  // Define a function to refresh the id_token
  const refreshIdToken = async () => {
    return await auth.currentUser.getIdToken(true);
  };

  let contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
    errMsg: errMsg,
    refreshIdToken: refreshIdToken,
  };

  return (
    <FBAuthContext.Provider value={contextData}>
      {!pending && children}
    </FBAuthContext.Provider>
  );
};
