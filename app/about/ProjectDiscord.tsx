import { Box, Card, Divider, Grid, Text, Title } from "@mantine/core";
import { useStyles } from "./styles";
import { FormEvent, useState, ChangeEvent } from "react";
import EchartCandles from "@/components/ECharts/About/EChartCandles";
import Image from "next/image";

export const ProjectDiscord: React.FC = () => {
  const { classes } = useStyles();

  return (
    <>
      <Divider
        // className={classes.divider}
        my="xl"
        size="xl"
        variant="dashed"
        color="black"
        label={<Title size="30">Project: ASDiscord</Title>}
        labelPosition="center"
      />
      <Grid grow>
        <Grid.Col sm={1} md={2} lg={5} className={classes.grid}>
          <Text
            style={{
              textAlign: "justify",
              margin: "auto",
              justifyContent: "center",
              alignItems: "center",
            }}
            size="20px"
          >
            Visualization is the best way for me to learn. I created a discord
            bot schedule to display option greeks chart at market open.
            Additionally, users are able to input command with parameters to
            display charts based on expiration date, ticker and option greeks.
          </Text>
        </Grid.Col>
        <Grid.Col
          sm={1}
          md={2}
          lg={5}
          mih={500}
          //   style={{
          //     margin: "auto",
          //   }}
        >
          <Card mih={"inherit"}>
            <Image
              alt="Discord Image"
              src="/static/images/Discord.png"
              fill={true}
              style={{ objectFit: "contain", borderRadius: "50px" }}
            />
          </Card>
        </Grid.Col>
      </Grid>
      <Box style={{ textAlign: "center" }}>
        <br></br>
        <Title order={3} size="25px">
          {" "}
          Technologies used:
        </Title>
        <Text size="15px">
          <ul className={classes.list}>
            <li> Discord </li>
            <li> API Fetch</li>
            <li> Gunicorn </li>
            <li> Heroku </li>
            <li> Crontab </li>
            <li> Pandas </li>
          </ul>
        </Text>
      </Box>
    </>
  );
};
