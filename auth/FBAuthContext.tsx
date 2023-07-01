"use client";
import { createContext, useState, useContext, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { FBAuth } from "./FBfirebase";
import { useRouter } from "next/navigation";

export const FBAuthContext = createContext();
export const useFBAuth = () => {
  return useContext(FBAuthContext);
};

export const FBAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const [pending, setPending] = useState(true);
  const router = useRouter();
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FBAuth, async (currentUser) => {
      setUser(currentUser);
      setPending(false);
    });

    return unsubscribe;
  });

  // Define a function to refresh the id_token
  const refreshIdToken = async () => {
    return await FBAuth.currentUser?.getIdToken(true);
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
