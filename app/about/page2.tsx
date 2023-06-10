"use client";

import { Carousel } from "@mantine/carousel";
import { Button, Paper } from "@mantine/core";
import Image from "next/image";

// import { Paper, Button } from "@mantine/core";

const data = [
  {
    image: "/static/images/Me.jpg",
    title: "Pattaya, Thailand",
    category: "Nature",
    link: "https://www.pattayaelephantsanctuary.org/",
  },
  {
    image: "/static/images/Me2.jpg",
    title: "Hawaii, US",
    category: "Nature",
    link: "https://wailuaheritagetrail.org/",
  },
  {
    image: "/static/images/Me3.jpg",
    title: "Houston, US",
    category: "Nature",
    link: "https://spacecenter.org/",
  },
  {
    image: "/static/images/Me4.jpg",
    title: "Alaska, US",
    category: "Nature",
    link: "https://goo.gl/maps/a8qpZHfNtGJgpyGo9",
  },
];

function Cards({ image, title, link }) {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      // sx={{ backgroundImage: `${image}` }}
      // sx = {{backgroundImage: `url${image}`}}
    >
      <Image fill={true} src={image}></Image>
      <Button
        variant="white"
        color="dark"
        component="a"
        target="_blank"
        href={link}
      >
        {title}
      </Button>
    </Paper>
  );
}

export default function Images() {
  // const autoplay = useRef(Autoplay({ delay: 7500 }));
  const slides = data.map((img) => (
    <Carousel.Slide key={img.title}>
      <Cards {...img} />
    </Carousel.Slide>
  ));
  return (
    <Carousel>{slides}</Carousel>

    // <Carousel maw={320} mx="auto" withIndicators height={200}>
    //   <Carousel.Slide>
    //     <Image width="500" height="500" src="/static/images/Me.jpg"></Image>
    //   </Carousel.Slide>
    //   <Carousel.Slide>2</Carousel.Slide>
    // </Carousel>
  );
}
