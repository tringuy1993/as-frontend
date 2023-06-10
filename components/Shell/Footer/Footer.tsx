//https://upmostly.com/tutorials/how-to-use-chart-js-with-react
"use client";
import { ActionIcon, Box, Divider, Text, Title } from "@mantine/core";
import { IoMail, IoLogoLinkedin, IoLogoGithub } from "react-icons/io5";
import { useStyles } from "./styles";
import ModalComp from "@/components/modal/Modal";
import { Contact } from "@/components/contact/Contact";
import { useDisclosure } from "@mantine/hooks";

const Footer = () => {
  const { classes } = useStyles();
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Box style={{ textAlign: "center" }}>
      <Divider />
      {/* <Title>Tri Nguyen &middot; Avid Learner</Title> */}
      <Text>
        <ul className={classes.list}>
          <li>
            <IoLogoLinkedin
              onClick={() => {
                window.location.href =
                  "https://www.linkedin.com/in/tringuyen-healthphysicist/";
              }}
            />
          </li>
          <li>
            {/* <a href="https://github.com/tringuy1993"> */}
            <IoLogoGithub
              onClick={() => {
                window.location.href = "https://github.com/tringuy1993";
              }}
            />
            {/* </a> */}
          </li>
          <li>
            <IoMail onClick={open} />
            <ModalComp opened={opened} open={open} close={close}>
              <Contact />
            </ModalComp>
          </li>
        </ul>
      </Text>
      <a href="/disclaimers">Disclaimers</a>
    </Box>
  );
};

export default Footer;
