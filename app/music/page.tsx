"use client";
import React, { useState } from "react";
import { buttonUrls } from "./api/MusicData";
import { useStyles } from "./styles";

import { Card, Group, Button, Text } from "@mantine/core";
import GenreView2 from "./[genre]/GenreView";
type genreType = {
  genre: string;
};
const Music = () => {
  const { classes } = useStyles();
  const [genre, setGenre] = useState<genreType>();
  // //https://nextjs.org/docs/pages/api-reference/components/link
  const handleGenreClick = (genreText: string): void => {
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

  return (
    <>
      <Text className={classes.title}>
        <h1 className="text-align=center">Select Your Type of Music!</h1>
        {genre && <h2>{genre.genre} queued up!</h2>}
      </Text>

      <Card withBorder radius="md" className={classes.card}>
        {/* Display All the Type/Genre of music. */}
        <Group position="center">{urlButtons}</Group>
      </Card>
      <br></br>
      {genre && <GenreView2 params={genre} />}
    </>
  );
};

export default Music;
