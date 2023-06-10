"use client";

import { Carousel } from "@mantine/carousel";
import { Paper, Button } from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import Image from "next/image";

import { useStyles } from "./styles";
type data = {
  image: string;
  title: string;
  category: string;
  link: string;
  priority: boolean;
};
const data = [
  {
    image: "/static/images/Me.jpg",
    title: "Pattaya, Thailand",
    category: "Nature",
    link: "https://www.pattayaelephantsanctuary.org/",
    priority: true,
  },
  {
    image: "/static/images/Me2.jpg",
    title: "Hawaii, US",
    category: "Nature",
    link: "https://wailuaheritagetrail.org/",
    priority: false,
  },
  {
    image: "/static/images/Me3.jpg",
    title: "Houston, US",
    category: "Nature",
    link: "https://spacecenter.org/",
    priority: false,
  },
  {
    image: "/static/images/Me4.jpg",
    title: "Alaska, US",
    category: "Nature",
    link: "https://goo.gl/maps/a8qpZHfNtGJgpyGo9",
    priority: false,
  },
];

const Cards: React.FC<data> = ({ image, title, link, priority }) => {
  const { classes } = useStyles();
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      className={classes.card}
      style={{ objectFit: "cover" }}
    >
      <Image
        fill={true}
        src={image}
        alt={title}
        priority={priority}
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      ></Image>
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
};

export const Images: React.FC = () => {
  const { classes } = useStyles();
  const autoplay = useRef(Autoplay({ delay: 7500 }));
  const slides = data.map((img) => (
    <Carousel.Slide key={img.title}>
      <Cards {...img} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      sx={classes.carousel}
      classNames={{ viewport: classes.viewport }}
      mx="auto"
      withIndicators
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={autoplay.current.reset}
    >
      {slides}
    </Carousel>
  );
};
