"use client";
import { createContext, useState, useContext, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { FBAuth } from "./FBfirebase";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

export const FBAuthContext = createContext();
export const useFBAuth = () => {
  return useContext(FBAuthContext);
};

export const FBAuthProvider = ({ children }) => {
  const [errMsg, setErrMsg] = useState("");
  const router = useRouter();
  const [user, loading] = useAuthState(FBAuth);
  let loginUser = async (e) => {
    await signInWithEmailAndPassword(FBAuth, e.email, e.password)
      .then(() => router.push("/home"))
      .catch((error) => {
        setErrMsg(error.code);
      });
  };

  let logoutUser = () => {
    signOut(FBAuth);
    console.log("LogOut");
    router.push("/signin");
  };

  let contextData = {
    user: user,
    loginUser: loginUser,
    logoutUser: logoutUser,
    loadingUser: loading,
    errMsg: errMsg,
    // refreshIdToken: refreshIdToken,
  };

  return (
    <FBAuthContext.Provider value={contextData}>
      {!loading && children}
    </FBAuthContext.Provider>
  );
};
