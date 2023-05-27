"use client";

import { Carousel } from "@mantine/carousel";
import { Paper, Button } from "@mantine/core";
// import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

import { useStyles } from "./DetailStyles";

const data = [
  {
    image: "/about/img/Me.jpg",
    title: "Pattaya, Thailand",
    category: "Nature",
    link: "https://www.pattayaelephantsanctuary.org/",
  },
  {
    image: "/about/img/Me2.jpg",
    title: "Hawaii, US",
    category: "Nature",
    link: "https://wailuaheritagetrail.org/",
  },
  {
    image: "/about/img/Me3.jpg",
    title: "Houston, US",
    category: "Nature",
    link: "https://spacecenter.org/",
  },
  {
    image: "/about/img/Me4.jpg",
    title: "Alaska, US",
    category: "Nature",
    link: "https://goo.gl/maps/a8qpZHfNtGJgpyGo9",
  },
];

function Cards({ image, title, link }) {
  const { classes } = useStyles();
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      sx={{ backgroundImage: `${image}` }}
      // sx = {{backgroundImage: `url${image}`}}
      className={classes.card}
    >
      <Button
        variant="white"
        color="dark"
        className={classes.category}
        component="a"
        target="_blank"
        href={link}
      >
        {title}
      </Button>
    </Paper>
  );
}

export function Images() {
  const { classes } = useStyles();
  // const autoplay = useRef(Autoplay({ delay: 7500 }));
  const slides = data.map((img) => (
    <Carousel.Slide key={img.title}>
      <Cards {...img} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      // sx={{ maxWidth: 500 }}
      sx={classes.carousel}
      mx="auto"
      withIndicators
      // height={500}
      // plugins={[autoplay.current]}
      // onMouseEnter={autoplay.current.stop}
      // onMouseLeave={autoplay.current.reset}
    >
      {slides}
    </Carousel>
  );
}
