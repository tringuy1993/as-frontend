"use client";

import * as React from "react";
import { startTransition } from "react";
import type { User as FirebaseUser } from "firebase/auth";
import { IdTokenResult } from "firebase/auth";
import { useFirebaseAuth } from "./firebase";
import { clientConfig } from "../config/client-config";
import { Tenant } from "./types";
import { AuthContext } from "./context";
import {
  loginWithProvider,
  loginWithProviderProp,
} from "@/app/(auth)/firebase";
import { useRouter } from "next/navigation";

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
  const handleLogout = async () => {
    const auth = await getFirebaseAuth();
    const { signOut } = await import("firebase/auth");
    await signOut(auth);
    // Removes authentication cookies
    await fetch("/api/logout", {
      method: "GET",
      // mode: "same-origin",
    });

    router.push("/signin");
  };

  const handleLogin = async (e: loginWithProviderProp) => {
    setLoading(true);
    const auth = await getFirebaseAuth();
    await loginWithProvider({
      auth: auth,
      email: e.email,
      password: e.password,
    })
      .then(() => {
        router.push("/home");
      })
      .catch((error) => {});
    setLoading(false);
  };

  // const handleLogin = React.useCallback(async (e) => {
  //   const auth = await getFirebaseAuth();
  //   await loginWithProvider(auth, e.email, e.password);
  //   router.push("/home");
  // }, []);

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
    await fetch("/api/login", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenResult.token}`,
      },
      mode: "same-origin",
    });
    startTransition(() => {
      setTenant(mapFirebaseResponseToTenant(tokenResult, firebaseUser));
    });
  };

  const registerChangeListener = async () => {
    const auth = await getFirebaseAuth();
    const { onIdTokenChanged } = await import("firebase/auth");
    return onIdTokenChanged(auth, handleIdTokenChanged);
  };

  React.useEffect(() => {
    const unsubscribePromise = registerChangeListener();
    return () => {
      unsubscribePromise.then((unsubscribe) => unsubscribe());
    };
  }, [tenant?.idToken, handleLogin, handleLogout]);
  const context = {
    tenant: tenant,
    loginUser: handleLogin,
    logoutUser: handleLogout,
  };

  return (
    <AuthContext.Provider value={context}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
