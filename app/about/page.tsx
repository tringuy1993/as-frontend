"use client";

import { Container, Grid, MediaQuery } from "@mantine/core";
import { useStyles } from "./styles";
import { Intro } from "./Intro";
import { DevJourney } from "./DevJourney";
import { ProjectAS } from "./ProjectAS";
import { ProjectDiscord } from "./ProjectDiscord";

const About = () => {
  //Typing Element

  const { classes } = useStyles();

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
