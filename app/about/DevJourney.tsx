import { Box, Divider, Text, Title } from "@mantine/core";
import { useStyles } from "./styles";

export const DevJourney: React.FC = () => {
  const { classes } = useStyles();
  return (
    <Box>
      <Divider
        // className={classes.divider}
        my="xl"
        size="xl"
        variant="dashed"
        label={<Title size="30">My Dev Journey</Title>}
        labelPosition="center"
      />
      <Text style={{ textAlign: "justify" }} size="20px">
        I began my frontend and fullstack development with my curiosity of how{" "}
        <a href="https://corporatefinanceinstitute.com/resources/derivatives/option-greeks/">
          greek options
        </a>{" "}
        work in the financial world. I started out with a complex repository I
        found online that can fetch data from an API endpoint and display the
        data via <a href="https://plotly.com/dash/">Dash Plotly</a>. Dash plotly
        is a great library for beginner like me because there are many tutorials
        out there on youtube, more specifically{" "}
        <a href="https://www.youtube.com/@CharmingData"> Charming Data</a>.
        Charming Data is an amazing source that taught me to plot data and most
        importantly got me to where I am today, deploy a webpage - then
        fullstack. I learned a great deal from Charming Data. However, I
        realized I need to pursue fullstack development in-depth in order to
        organize my code structure and layout in cohesive manner that I can
        potentially scale to larger audience down the road. Additionally, I
        thought it is more beneficial to understand the fundamentals of how and
        why my code work rather than following tutorial blindly.
        <br></br>
      </Text>
      <Box className={classes.tldr}>
        <br></br>
        <Title order={3} size="25px">
          {" "}
          TLDR:
        </Title>
        <Text size="20px">
          <ol>
            <li>
              I learn to code for fun during my free time - approximately 40
              hours per week.
            </li>
            <li>
              {"I`m"} obsess with building programs that optimize my daily task
              at work and off work.
            </li>
            <li>
              {"I`m"} currently focusing on fullstack to build a site that I can
              access greek option data anywhere at any time.
            </li>
            <li>
              My backend skill is cherry picked from many great youtube videos
              and tutorials. As for my frontend and fullstack skills,
              {"I`m"}learning a great deal from Frontend Masters -{" "}
              <a href="https://frontendmasters.com/u/arbolito/">click here</a>{" "}
              to track my progress!
            </li>
          </ol>
          <Title size="25px">
            Click for my resume:
            <a href="https://drive.google.com/drive/folders/1Uxq-nm1G5FJrUBA0h0RkCsEYPbqhLqna">
              Resume
            </a>
          </Title>
        </Text>
      </Box>
    </Box>
  );
};
