"use client";
import { useFBAuth } from "@/auth/FBAuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type ChildrenProps = {
  children: React.ReactNode;
};

export default function Layout({ children }: ChildrenProps) {
  // const { user } = useFBAuth();
  // const router = useRouter();
  // useEffect(() => {
  //   if (user == null) router.push("/signin");
  // }, [user]);
  return <>{children}</>;
}
