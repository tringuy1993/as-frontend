"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { useFBAuth } from "../(auth)/FBAuthContext";
import { useAuth } from "@/auth/hooks";

export default function Layout({ children }) {
  const user = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (user == null) {
      // router.replace("/signin");
      console.log("can't singin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return <>{children}</>;
}
