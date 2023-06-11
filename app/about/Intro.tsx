import {
  SiPostgresql,
  SiJavascript,
  SiRedis,
  SiDjango,
  SiPython,
  SiClickup,
  SiReact,
  SiTypescript,
  SiFirebase,
  SiGooglecloud,
  SiSlack,
  SiNginx,
  SiGunicorn,
} from "react-icons/si";
import { Images } from "./Images";
import { Grid, List, Text, Title, Box, Space } from "@mantine/core";
import { useStyles } from "./styles";

export const Intro: React.FC = () => {
  const { classes } = useStyles();
  return (
    <Grid grow>
      <Grid.Col sm={1} md={5} lg={7} sx={classes.grid}>
        <Box>
          <Title order={1} size="75px">
            Full-Stack Developer
          </Title>
          <Space h="xl" />
          <Title size="35px">Hi, I&apos;m Tri Nguyen.</Title>
          <Space h="lg" />
          <Text size="25px" style={{ textAlign: "justify" }}>
            I am a passionate, self-taught, full-stack developer who goes the
            extra mile, dedicating 40 hours of coding after my 9-5 job. With my
            unwavering commitment to continuous learning and delivering
            high-quality solutions, I thrive in fast-paced environments and
            excel at turning complex ideas into functional and intuitive
            applications.
          </Text>
          <Space h="xl" />
          <Text size="20px" sx={{ textAlign: "center" }}>
            Technologies:
            <span style={{ marginLeft: "8px" }}>
              <SiPython />
            </span>
            <span style={{ marginLeft: "8px" }}>
              <SiJavascript />
            </span>
            <span style={{ marginLeft: "8px" }}>
              <SiTypescript />
            </span>
            <span style={{ marginLeft: "8px" }}>
              <SiDjango />
            </span>
            <span style={{ marginLeft: "8px" }}>
              <SiReact />
            </span>
            <span style={{ marginLeft: "8px" }}>
              <SiRedis />
            </span>
            <span style={{ marginLeft: "8px" }}>
              <SiPostgresql />
            </span>
            <span style={{ marginLeft: "8px" }}>
              <SiFirebase />
            </span>
            <span style={{ marginLeft: "8px" }}>
              <SiGooglecloud />
            </span>
            <span style={{ marginLeft: "8px" }}>
              <SiNginx />
            </span>
            <span style={{ marginLeft: "8px" }}>
              <SiGunicorn />
            </span>
            <span style={{ marginLeft: "8px" }}>
              <SiClickup />
            </span>
            <span style={{ marginLeft: "8px" }}>
              <SiSlack />
            </span>
          </Text>
        </Box>
      </Grid.Col>
      <Grid.Col sm={1} md={5} lg={5}>
        <Images />
      </Grid.Col>
    </Grid>
  );
};
