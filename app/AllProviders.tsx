"use client";
import RootStyleRegistry from "./emotion";
import { MainShell } from "@/components";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

export default function AllProviders({ children }) {
  return (
    // <FBAuthProvider>
    <RootStyleRegistry>
      <ModalsProvider>
        <Notifications position="top-center" />
        <MainShell>{children}</MainShell>
      </ModalsProvider>
    </RootStyleRegistry>
    // </FBAuthProvider>
  );
}
