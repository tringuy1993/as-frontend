"use client";
import React from "react";

import { useRouter } from "next/navigation";
import { useAuth } from "@/auth/hooks";

type ChildrenProps = {
  children: React.ReactNode;
};
export default function Layout({ children }: ChildrenProps) {
  const { tenant } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (tenant === null) {
      router.push("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenant?.idToken]);

  return <>{children}</>;
}
