// import firebase_app from "../config";

import { useEffect, useState } from "react";
import { UserCredential } from "firebase/auth";
import { loginWithProvider } from "@/app/(auth)/firebase";
import { useFirebaseAuth } from "./firebase";
import { clientConfig } from "@/config/client-config";

type SignInResult = {
  result?: UserCredential;
  error?: unknown;
  status: SignInStatus;
};

enum SignInStatus {
  loading = "loading",
  error = "error",
  success = "success",
}

export const useSignIn = () => {
  const { getFirebaseAuth } = useFirebaseAuth(clientConfig);
  const [status, setStatus] = useState<SignInStatus>();
  const [result, setData] = useState<UserCredential>();
  const [error, setError] = useState();

  const signIn = async (email: string, password: string) => {
    setStatus(true);
    const auth = await getFirebaseAuth();
    loginWithProvider({ auth, email, password })
      .then((res) => {
        console.log("Success");
        setData(res);
        setStatus(false);
      })
      .catch((error) => {
        setStatus(SignInStatus.error);
        setError(error);
      });
  };
  console.log(status);

  return { signIn, status, result, error };
};
