"use client";
import { useEffect, useRef, useState } from "react";
import Typed from "typed.js";
// import EchartCandles from "./EchartCandles";
import { Grid } from "@mantine/core";
import { Images } from "./Images";
// import "./DetailsCSS.js";
import Image from "next/image";

const Details = () => {
  //Typing Element
  const element = useRef(null);
  // Open and Close Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    <>
      <section id="intro">
        <Grid>
          <Grid.Col sm={1} md={6} lg={7}>
            <div className="text">
              <p className="name">
                Hi, my name is <span>Tri Nguyen</span>
              </p>
              <h2>
                {/* react/no-unescaped-entities */}
                {`I'm a`} <span ref={element}></span>
              </h2>
              <p>
                I began my frontend and fullstack development with my curiosity
                of how{" "}
                <a href="https://corporatefinanceinstitute.com/resources/derivatives/option-greeks/">
                  greek options
                </a>{" "}
                work in the financial world. I started out with a complex
                repository I found online that can fetch data from an API
                endpoint and display the data via{" "}
                <a href="https://plotly.com/dash/">Dash Plotly</a>. Dash plotly
                is a great library for beginner like me because there are many
                tutorials out there on youtube, more specifically{" "}
                <a href="https://www.youtube.com/@CharmingData">
                  {" "}
                  Charming Data
                </a>
                . Charming Data is an amazing source that taught me to plot data
                and most importantly got me to where I am today, deploy a
                webpage - then fullstack. I learned a great deal from Charming
                Data. However, I realized I need to pursue fullstack development
                in-depth in order to organize my code structure and layout in
                cohesive manner that I can potentially scale to larger audience
                down the road. Additionally, I thought it is more beneficial to
                understand the fundamentals of how and why my code work rather
                than following tutorial blindly.
                <br></br>
              </p>
              <h1>TLDR:</h1>
              <ol>
                <li>
                  I learn to code for fun during my free time - approximately 40
                  hours per week.
                </li>
                <li>
                  {"I`m"} obsess with building programs that optimize my daily
                  task at work and off work.
                </li>
                <li>
                  {"I`m"} currently focusing on fullstack to build a site that I
                  can access greek option data anywhere at any time.
                </li>
                <li>
                  My backend skill is cherry picked from many great youtube
                  videos and tutorials. As for my frontend and fullstack skills,
                  {"I`m"}learning a great deal from Frontend Masters -{" "}
                  <a href="https://frontendmasters.com/u/arbolito/">
                    click here
                  </a>{" "}
                  to track my progress!
                </li>
              </ol>
              <h1>
                Here is my ={`>`}
                <a href="/about/TN-Resume.pdf">Resume</a>
              </h1>
            </div>
          </Grid.Col>
          <Grid.Col sm={1} md={6} lg={5} style={{ margin: "auto" }}>
            <Images />
          </Grid.Col>
        </Grid>
      </section>
      <div className="gradient"></div>
      <div className="section-dkblue">
        <section id="projects">
          <Grid>
            <Grid.Col sm={1} md={6} lg={6}>
              <div className="text">
                <h4>Ongoing Project</h4>
                <h3> Alpha-Seekers </h3>

                <div className="blackbox">
                  This project is the birth of my fullstack development. Dash
                  plotly was good to visualize data and quickly deploy on
                  Heroku. However, I quickly realized some drawbacks on my codes
                  below:
                  <ol>
                    <li>
                      My plots cannot display semi-live data to multiple clients
                      because the data API is directly fetched from the source.
                      Additionally, there is a limit on # of requests from data
                      API endpoint.
                    </li>
                    <li>
                      My code structure quickly got out of hand with no
                      organization and at times, it gets harder to debug.
                    </li>
                    <li>
                      I do not know how Heroku works other than following some
                      tutorial. In my opinion, it is beneficial to understand
                      how Heroku works.
                    </li>
                  </ol>
                  I deployed the following solutions below for each problem
                  above:
                  <ol>
                    <li>
                      I utilize Django and Django RestFrameWork as my backend
                      and server to create my own API endpoint. My API endpoint
                      fetches and compute all the neccessary data continuously
                      with crontab scheduler via Celery Beat. In this way, my
                      frontend is more responsive without the need of computing
                      data.
                    </li>
                    <li>
                      I utilize React as my webframework to have better coding
                      structures along with reusable components that I do not
                      have to repeat myself.
                    </li>
                    <li>
                      It urks me that I do not understand how Heroku works. I
                      have a personal NAS and I found out that I can host my
                      website on my NAS! I learned how to deploy my website{" "}
                      <a href="www.alpha-seekers.com">Alpha-Seekers</a> on my
                      virtual machine with Nginx (React) and Gunicorn (Django)
                      via a linux server on my NAS.
                    </li>
                  </ol>
                </div>
                <h4> Technologies used include:</h4>
                <ul>
                  <li> Django </li>
                  <li> Django RestFrameWork</li>
                  <li> Django SimpleJWT</li>
                  <li> Gunicorn </li>
                  <li> Celery </li>
                  <li> Crontab </li>
                  <li> Redis </li>
                  <li> Pandas </li>

                  <li> React </li>
                  <li> Axios </li>
                  <li> Nginx </li>
                </ul>
              </div>
            </Grid.Col>
            <Grid.Col sm={1} md={6} lg={6}>
              {/* <EchartCandles symbol={submittedTicker} /> */}
            </Grid.Col>
          </Grid>
        </section>
      </div>
      <div className="gradient"></div>

      <div className="section-dkblue">
        <section id="projects">
          <Grid>
            <Grid.Col sm={1} md={6} lg={6}>
              <Image
                className="imgsize"
                src="/about/img/MySite.png"
                alt="Screenshot of the Wall of Wonder."
                width="500"
                height="600"
              />
            </Grid.Col>
            <Grid.Col sm={1} md={6} lg={6}>
              <div className="reverse">
                <h4> Frontend Project</h4>
                <h3> Getting Started with CSS</h3>
                <p className="blackbox">
                  I did not learn CSS nor HTML when I embarked on building a
                  website a year ago. I mainly used bootstrap for all my
                  previous websites that I built because bootstrap is very easy
                  to use for beginners like me. As I advanced with my skills in
                  building website, I realized that I need to learn the
                  fundamentals and roots of how bootstrap is created.Hence, I
                  began my journey with Jen Kramer to broaden my CSS and HTML
                  skill.
                  <br />
                  <small>
                    Course source:
                    <a href="https://frontendmasters.com/courses/getting-started-css/">
                      Getting Started with CSS
                    </a>
                  </small>
                  <br></br>
                </p>
                <h4> Technologies used include:</h4>
                <ul>
                  <li> HTML </li>
                  <li> CSS </li>
                  <li> SVG </li>
                </ul>
              </div>
            </Grid.Col>
          </Grid>
          <article className="reverse">
            {/* <div className="image"></div> */}
          </article>
        </section>
      </div>
      <div className="gradient"></div>
      <div className="section-dkblue">
        <section id="projects">
          <Grid>
            <Grid.Col sm={1} md={6} lg={6}>
              <div className="text">
                <h4>Discord Bot</h4>
                <h3> ASDiscord Bot </h3>

                <p className="blackbox">
                  Visualization is the best way for me to learn. I created a
                  discord bot schedule to display option greeks chart at market
                  open. Additionally, users are able to input command with
                  parameters to display charts based on expiration date, ticker
                  and option greeks.
                </p>
                <h4> Technologies used include:</h4>
                <ul>
                  <li> Discord </li>
                  <li> API Fetch</li>
                  <li> Gunicorn </li>
                  <li> Heroku </li>
                  <li> Crontab </li>
                  <li> Pandas </li>
                </ul>
              </div>
            </Grid.Col>
            <Grid.Col sm={1} md={6} lg={6}>
              <Image
                className="imgsize"
                src="/about/img/DiscordBot.png"
                alt="Screenshot of the Wall of Wonder."
                width="500"
                height="500"
                // style="width:500px; height:500px"
              />
            </Grid.Col>
          </Grid>
        </section>
      </div>

      <div className="gradient"></div>
    </>
  );
};

export default Details;
