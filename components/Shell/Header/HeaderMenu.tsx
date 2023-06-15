"use client";
import {
  Header,
  Group,
  Button,
  Divider,
  Burger,
  Drawer,
  ScrollArea,
  ActionIcon,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";
import { BsFillPersonFill } from "react-icons/bs";
import { IoLogOut } from "react-icons/io5";
import { ThemeToggle } from "@/theme/ThemeToggle";
import { useStyles } from "./HeaderMenuStyle";
import { useFBAuth } from "@/app/(auth)/FBAuthContext";
import ModalComp from "@/components/modal/Modal";
import { Contact } from "@/components/contact/Contact";
import Link from "next/link";

const logInMenu = (user, logoutUser, menuType) => {
  if (menuType === "Main") {
    return (
      <>
        {user ? (
          <ActionIcon onClick={logoutUser}>
            <IoLogOut className="icon" />
          </ActionIcon>
        ) : (
          <ActionIcon component="a" href="/signin">
            <BsFillPersonFill className="icon" />
          </ActionIcon>
        )}
      </>
    );
  } else {
    return (
      <>
        {" "}
        {user ? (
          <Button onClick={logoutUser} leftIcon={<IoLogOut className="icon" />}>
            <span>Log Out</span>
          </Button>
        ) : (
          <Button
            leftIcon={<BsFillPersonFill className="icon" />}
            component="a"
            href="/signin"
          >
            <span>Log In</span>
          </Button>
        )}
      </>
    );
  }
};

const menuItems = [
  { href: "/home", text: "Home", prefetch: false },
  { href: "/greektime", text: "Time", prefetch: false },
  { href: "/backtest", text: "Back Test", prefetch: false },
  { href: "/about", text: "About", prefetch: true },
];

const HeaderMenu = () => {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);

  const { classes, theme } = useStyles();
  const { user, logoutUser } = useFBAuth();

  function links() {
    return (
      <>
        <ThemeToggle />
        {menuItems.map((link) => (
          <Link
            href={link.href}
            className={classes.link}
            prefetch={link.prefetch}
            key={`${link.href}+${link.text}`}
          >
            {link.text}
          </Link>
        ))}
        <Button onClick={open} variant="white">
          Contact
        </Button>
        <ModalComp opened={opened} open={open} close={close}>
          <Contact />
        </ModalComp>

        <Link href="/music" className={classes.link}>
          Music
        </Link>
        {/* <ThemeToggler></ThemeToggler> */}
      </>
    );
  }

  return (
    <>
      <Header className={classes.header} height="">
        <Group position="apart" sx={{ height: "100%" }}>
          <h1>
            <a href="/home" className={classes.brand} key="title">
              Seekers
            </a>
          </h1>
          <Group className={classes.hiddenMobile}>
            {links()}
            {logInMenu(user, logoutUser, "Main")}
          </Group>
          {/* <Button onClick={openModal}>Open confirm modal</Button>; */}
          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className={classes.hiddenDesktop}
          />
        </Group>
      </Header>
      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Alpha-Seekers"
        className={classes.hiddenDesktop}
      >
        <ScrollArea sx={{ height: "calc(100vh-60px)" }} mx="-md">
          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          ></Divider>
          {links()}

          <Divider
            my="sm"
            color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
          ></Divider>

          <Group position="center" grow pb="xl" px="md">
            {logInMenu(user, logoutUser, "")}
            <Button>Sign up</Button>
          </Group>
        </ScrollArea>
      </Drawer>
    </>
  );
};

export default HeaderMenu;
