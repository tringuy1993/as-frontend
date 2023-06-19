// import firebase_app from "../config";

import { useEffect, useState } from "react";
import firebaseClient from "./firebaseClient";
import {
  signInWithEmailAndPassword,
  getAuth,
  UserCredential,
} from "firebase/auth";

const auth = getAuth(firebaseClient);

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
  const [status, setStatus] = useState<SignInStatus>();
  const [result, setData] = useState<UserCredential>();
  const [error, setError] = useState();

  const signIn = (email: string, password: string): void => {
    setStatus(SignInStatus.loading);
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setData(res);
        setStatus(SignInStatus.success);
      })
      .catch((error) => {
        setStatus(SignInStatus.error);
        setError(error);
      });
  };

  return { signIn, status, result, error };
};

// const signIn = (email: string, password: string): Promise<SignInResult> => {
//   return signInWithEmailAndPassword(auth, email, password)
//     .then((res) => {
//       return { result: res };
//     })
//     .catch((error) => {
//       return { error };
//     });
// };

// export default signIn;
