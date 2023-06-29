"use client";

import * as React from "react";
import { startTransition } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import { IdTokenResult, signOut } from "firebase/auth";
import { useFirebaseAuth } from "./firebase";
import { clientConfig } from "../config/client-config";
import { Tenant } from "./types";
import { AuthContext } from "./context";
import {
  loginWithProvider,
  loginWithProviderProp,
} from "@/app/(auth)/firebase";
import { useRouter, useSearchParams } from "next/navigation";
import { useSignIn } from "./signin";

const mapFirebaseResponseToTenant = (
  result: IdTokenResult,
  user: FirebaseUser
): Tenant => {
  const providerData = user.providerData && user.providerData[0];

  if (!user.isAnonymous && providerData) {
    return {
      id: user.uid,
      name: providerData.displayName || user.displayName || user.email || null,
      email: providerData.email || null,
      emailVerified: user.emailVerified || false,
      photoUrl: providerData.photoURL || null,
      customClaims: {},
      isAnonymous: user.isAnonymous,
      idToken: result.token,
    };
  }

  return {
    id: user.uid,
    name: user.displayName || providerData?.displayName || user.email || null,
    email: user.email || null,
    emailVerified: user.emailVerified || false,
    photoUrl: user.photoURL || null,
    customClaims: {},
    isAnonymous: user.isAnonymous,
    idToken: result.token,
  };
};

export interface AuthProviderProps {
  defaultTenant: Tenant | null;
  children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  defaultTenant,
  children,
}) => {
  const { getFirebaseAuth } = useFirebaseAuth(clientConfig);
  const firstLoadRef = React.useRef(true);
  const [tenant, setTenant] = React.useState(defaultTenant);
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  // Call logout any time
  const handleLogout = async (): Promise<void> => {
    const auth = await getFirebaseAuth();
    await signOut(auth);
    // Removes authentication cookies
    await fetch("/api/logout", {
      method: "GET",
      mode: "same-origin",
    });

    localStorage.clear();

    router.refresh();
  };

  // const { signIn, status } = useSignIn();
  // const handleLogin = (e) => {
  //   signIn(e.email, e.password);
  //   router.push("/home");
  // };
  const handleLogin = async (e: loginWithProviderProp): Promise<void> => {
    // const params = useSearchParams();
    setLoading(true);
    const auth = await getFirebaseAuth();
    await loginWithProvider({
      auth: auth,
      email: e.email,
      password: e.password,
    })
      .then(() => {
        setLoading(false);
        router.push("/home");
        // console.log(`pushed home page ${router}`);
      })
      .catch((error) => {
        alert(`you got an error buddy: ${error}`);
      });
  };

  const handleIdTokenChanged = async (firebaseUser: FirebaseUser | null) => {
    if (firebaseUser && tenant && firebaseUser.uid === tenant.id) {
      firstLoadRef.current = false;
      return;
    }

    if (!firebaseUser) {
      firstLoadRef.current = false;
      startTransition(() => {
        setTenant(null);
      });
      return;
    }

    firstLoadRef.current = false;

    const tokenResult = await firebaseUser.getIdTokenResult();

    startTransition(() => {
      setTenant(mapFirebaseResponseToTenant(tokenResult, firebaseUser));
    });
  };

  const registerChangeListener = async () => {
    const auth = await getFirebaseAuth();
    const { onIdTokenChanged } = await import("firebase/auth");
    return onIdTokenChanged(auth, handleIdTokenChanged);
  };

  const refreshIdToken = async () => {
    const response = await fetch("/api/refresh-tokens", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tenant?.idToken}`,
      },
      mode: "same-origin",
    });
    if (response.ok) {
      const data = await response.json();
      // Process the data or return it
      return data;
    } else {
      // Handle the error when the fetch request fails
      throw new Error("Failed to refresh id token");
    }
    // const auth = await getFirebaseAuth();
    // return auth.currentUser?.getIdToken(true);
  };

  React.useEffect(() => {
    const unsubscribePromise = registerChangeListener();
    return () => {
      unsubscribePromise.then((unsubscribe) => unsubscribe());
    };
  }, [tenant?.idToken, handleLogout, handleLogin, refreshIdToken]);
  const context = {
    tenant: tenant,
    loginUser: handleLogin,
    logoutUser: handleLogout,
    refreshIdToken: refreshIdToken,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
