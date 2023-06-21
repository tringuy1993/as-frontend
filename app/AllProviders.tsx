"use client";
import RootStyleRegistry from "./emotion";
import { MainShell } from "@/components";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";

type ChildrenProps = {
  children: React.ReactNode;
};
export default function AllProviders({ children }: ChildrenProps) {
  return (
    <RootStyleRegistry>
      <ModalsProvider>
        <Notifications position="top-center" />
        <MainShell>{children}</MainShell>
      </ModalsProvider>
    </RootStyleRegistry>
  );
}
