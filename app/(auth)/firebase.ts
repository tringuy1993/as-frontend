import type { Auth, AuthError } from "firebase/auth";
import { IdTokenResult } from "firebase/auth";
import { User as FirebaseUser } from "@firebase/auth";
import { Tenant } from "../../auth/types";
import { filterStandardClaims } from "next-firebase-auth-edge/lib/auth/tenant";
import { signInWithEmailAndPassword } from "firebase/auth";

const CREDENTIAL_ALREADY_IN_USE_ERROR = "auth/credential-already-in-use";
export const isCredentialAlreadyInUseError = (e: AuthError) =>
  e?.code === CREDENTIAL_ALREADY_IN_USE_ERROR;

export const mapFirebaseResponseToTenant = async (
  result: IdTokenResult,
  user: FirebaseUser
): Promise<Tenant> => {
  const providerData = user.providerData && user.providerData[0];
  const tokenResult = await user.getIdTokenResult();

  if (!user.isAnonymous && user.emailVerified && providerData) {
    return {
      id: user.uid,
      name: providerData.displayName || user.displayName || user.email || null,
      email: providerData.email || null,
      isAnonymous: false,
      emailVerified: user.emailVerified,
      customClaims: filterStandardClaims(tokenResult.claims),
      photoUrl: providerData.photoURL || user.photoURL || null,
      idToken: tokenResult.token,
    };
  }

  return {
    id: user.uid,
    name: user.displayName || providerData?.displayName || user.email || null,
    email: user.email || null,
    isAnonymous: true,
    emailVerified: user.emailVerified,
    photoUrl: user.photoURL || providerData?.photoURL || null,
    customClaims: filterStandardClaims(tokenResult.claims),
    idToken: tokenResult.token,
  };
};

export interface loginWithProviderProp {
  auth: Auth;
  email: string;
  password: string;
}

export const loginWithProvider = async ({
  auth,
  email,
  password,
}: loginWithProviderProp): Promise<Tenant> => {
  // const { signInWithEmailAndPassword } = await import("firebase/auth");
  const result = await signInWithEmailAndPassword(auth, email, password);
  const idTokenResult = await result.user.getIdTokenResult();
  await fetch("/api/signin", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${idTokenResult.token}`,
    },
    mode: "same-origin",
  });
  return mapFirebaseResponseToTenant(idTokenResult, result.user!);
};
