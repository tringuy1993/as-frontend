"use client";
import { AppShell } from "@mantine/core";
import HeaderMenu from "./Header/HeaderMenu";
import { useStyles } from "./MainShellStyle";
import Footer from "./Footer/Footer";

export default function MainShell({ children }) {
  const { classes, theme } = useStyles();
  return (
    <AppShell
      className={classes.body}
      header={<HeaderMenu />}
      footer={<Footer />}
    >
      {children}
    </AppShell>
  );
}
