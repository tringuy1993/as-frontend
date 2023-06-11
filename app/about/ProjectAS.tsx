import { Box, Divider, Grid, Text, TextInput, Title } from "@mantine/core";
import { useStyles } from "./styles";
import { FormEvent, useState } from "react";
import EchartCandles from "@/components/ECharts/About/EChartCandles";
import { useForm } from "@mantine/form";

export const ProjectAS: React.FC = () => {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      symbol: "^GSPC",
    },
  });
  // Changing Symbol for Modal
  const [symbol, setSymbol] = useState<string>("^GSPC");

  function handleChangeSymbol(symbol: string) {
    if (symbol === "SPX") {
      symbol = "^GSPC";
    }
    setSymbol(symbol);
    console.log(symbol);
  }

  const handleSubmitSymbol = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleChangeSymbol(form.values.symbol);
  };

  return (
    <>
      <Divider
        my="xl"
        size="xl"
        variant="dashed"
        label={<Title size="30">Project: Alpha-Seekers</Title>}
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
            This project is the birth of my fullstack development. Dash plotly
            was good to visualize data and quickly deploy on Heroku. However, I
            quickly realized some drawbacks on my codes below:
            <ol>
              <li>
                My plots cannot display semi-live data to multiple clients
                because the data API is directly fetched from the source.
                Additionally, there is a limit on # of requests from data API
                endpoint.
              </li>
              <li>
                My code structure quickly got out of hand with no organization
                and at times, it gets harder to debug.
              </li>
              <li>
                I do not know how Heroku works other than following some
                tutorial. In my opinion, it is beneficial to understand how
                Heroku works.
              </li>
            </ol>
            I deployed the following solutions below for each problem above:
            <ol>
              <li>
                I utilize Django and Django RestFrameWork as my backend and
                server to create my own API endpoint. My API endpoint fetches
                and compute all the neccessary data continuously with crontab
                scheduler via Celery Beat. In this way, my frontend is more
                responsive without the need of computing data.
              </li>
              <li>
                I utilize React as my webframework to have better coding
                structures along with reusable components that I do not have to
                repeat myself.
              </li>
              <li>
                It urks me that I do not understand how Heroku works. I have a
                personal NAS and I found out that I can host my website on my
                NAS! I learned how to deploy my website{" "}
                <a href="www.alpha-seekers.com">Alpha-Seekers</a> on my virtual
                machine with Nginx (React) and Gunicorn (Django) via a linux
                server on my NAS.
              </li>
            </ol>
          </Text>
        </Grid.Col>
        <Grid.Col
          sm={1}
          md={2}
          lg={5}
          style={{
            margin: "auto",
          }}
          bg="transparent"
        >
          <form onSubmit={handleSubmitSymbol}>
            <TextInput
              label="Select Ticker"
              {...form.getInputProps("symbol")}
            />
          </form>
          <EchartCandles symbol={symbol} />
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
            <li> Django </li>
            <li> Django RestFrameWork</li>
            <li> Django SimpleJWT</li>
            <li> Gunicorn </li>
            <li> Celery </li>
            <li> Crontab </li>
            <li> Redis </li>
            <li> Pandas </li>
            <li> NextJS</li>
            <li> React </li>
            <li> Axios </li>
            <li> Nginx </li>
          </ul>
        </Text>
      </Box>
    </>
  );
};
