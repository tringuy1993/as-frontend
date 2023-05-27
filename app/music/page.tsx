'use client'
import React from "react";
import { buttonUrls } from "./getMusic";
// import GenreView from "./components/GenreView";
import { useStyles } from "./MusicStyle";

import { Card, Group, Button } from "@mantine/core";

export default function PageMusic () {
  const { classes, theme } = useStyles();

  const handleClick = (buttonIndex) => {
    navigate(buttonUrls[buttonIndex]);
  };

  const genres = buttonUrls.map((str) => str.replace("/MusicGame", ""));
  console.log(genres)
  const urlButtons = buttonUrls.map((buttonText, index) => {
    const isDisabled =
      buttonText === "/MusicGame/TV" || buttonText === "/MusicGame/Films";
    return (
      <Button
        key={index}
        onClick={() => handleClick(index)}
        disabled={isDisabled}
        className={classes.buttons_root}
      >
        {buttonText.replace("/MusicGame/", "")}
      </Button>
    );
  });

  return (
    <>
      <h1>Select Your Type of Music!</h1>

      <Card withBorder radius="md" className={classes.card}>
        {/* Display All the Type/Genre of music. */}

        <Group position="center">{urlButtons}</Group>
      </Card>
      {/* <Routes>
        {genres.map((genre, index) => (
          <Route
            key={index}
            path={genre}
            element={<GenreView genre={genre} />}
          />
        ))}
      </Routes> */}
    </>
  );
};

// export default PageMusic;
