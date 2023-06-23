"use client";
import React from "react";

type ChildrenProps = {
  children: React.ReactNode;
};
export default function Layout({ children }: ChildrenProps) {
  return <>{children}</>;
}
