"use client";
import React from "react";

import { useRouter } from "next/navigation";
// import { useFBAuth } from "../(auth)/FBAuthContext";
import { useAuth } from "@/auth/hooks";

export default function Layout({ children }) {
  const { tenant } = useAuth();
  const router = useRouter();
  console.log("AuthLayout:", tenant);

  React.useEffect(() => {
    if (tenant === null) {
      router.push("/signin");
      console.log("can't singin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenant?.idToken]);

  return <>{children}</>;
}
