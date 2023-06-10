"use client";
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
// import EchartCandles from "./EchartCandles";
import { Container, Grid, MediaQuery } from "@mantine/core";
// import "./DetailsCSS.js";
import Image from "next/image";
import { useStyles } from "./styles";
import { Intro } from "./Intro";
import { DevJourney } from "./DevJourney";
import { ProjectAS } from "./ProjectAS";
import { ProjectDiscord } from "./ProjectDiscord";

const About = () => {
  //Typing Element
  const element = useRef(null);
  // Open and Close Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { classes } = useStyles();

  // Changing Symbol for Modal
  const [symbol, setSymbol] = useState("^GSPC");
  const [submittedTicker, setSubmittedTicker] = useState(symbol);

  function handleSubmit(event) {
    event.preventDefault();
    setSubmittedTicker(symbol);
  }

  function handleChange(event) {
    setSymbol(event.target.value);
  }

  useEffect(() => {
    const options = {
      strings: ["health physicst", "self-taught developer."],
      typeSpeed: 85,
      backSpeed: 85,
      loop: false,
      showCursor: false,
    };

    if (element.current) {
      const typed = new Typed(element.current, options);

      return () => {
        typed.destroy();
      };
    }
  }, []);
  return (
    <MediaQuery smallerThan="lg" styles={{ marginLeft: 0, marginRight: 0 }}>
      <Container sx={classes.root}>
        <Intro />
        <DevJourney />
        <ProjectAS />
        <ProjectDiscord />
      </Container>
    </MediaQuery>
  );
};

export default About;
