"use client";
import React, { useState } from "react";
import { buttonUrls } from "./api/MusicData";
import { useStyles } from "./styles";

import { Card, Group, Button } from "@mantine/core";
import GenreView2 from "./[genre]/GenreView";

const Music = () => {
  const { classes } = useStyles();
  const [genre, setGenre] = useState();
  console.log(genre);
  // //https://nextjs.org/docs/pages/api-reference/components/link
  const handleGenreClick = (genreText) => {
    // navigate(buttonUrls[buttonIndex]);
    console.log(genreText);
    const musicPath = `${genreText.replace("/MusicGame/", "")}`;
    setGenre({ genre: musicPath });
  };
  const urlButtons = buttonUrls.map((buttonText, index) => {
    const isDisabled =
      buttonText === "/MusicGame/TV" || buttonText === "/MusicGame/Films";
    if (buttonText === "/MusicGame/Gay Icons") {
      buttonText = "/MusicGame/GayIcons";
    } else if (buttonText === "/MusicGame/Hip Hop") {
      buttonText = "/MusicGame/HipHop";
    }
    return (
      // <Link
      //   href={`/music/${buttonText.replace("/MusicGame/", "")}`}
      //   key={buttonText}
      //   passHref
      //   legacyBehavior
      // >
      //   <Button
      //     key={index}
      //     disabled={isDisabled}
      //     className={classes.buttons_root}
      //   >
      //     {buttonText.replace("/MusicGame/", "")}
      //   </Button>
      // </Link>
      <Button
        key={index}
        disabled={isDisabled}
        className={classes.buttons_root}
        onClick={() => handleGenreClick(buttonText)}
      >
        {buttonText.replace("/MusicGame/", "")}
      </Button>
    );
  });
  // const params = { params: ge };

  return (
    <>
      <h1>Select Your Type of Music!</h1>
      <Card withBorder radius="md" className={classes.card}>
        {/* Display All the Type/Genre of music. */}
        <Group position="center">{urlButtons}</Group>
      </Card>
      {genre && <GenreView2 params={genre} />}
    </>
  );
};

export default Music;
