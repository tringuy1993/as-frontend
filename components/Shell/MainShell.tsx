"use client";
import { AppShell } from "@mantine/core";
import HeaderMenu from "./Header/HeaderMenu";
import { useStyles } from "./MainShellStyle";
import Footer from "./Footer/Footer";

export default function MainShell({ children }: { children: React.ReactNode }) {
  const { classes, theme } = useStyles();
  return (
    <AppShell
      className={classes.theme}
      header={<HeaderMenu />}
      footer={<Footer />}
    >
      {children}
    </AppShell>
  );
}
