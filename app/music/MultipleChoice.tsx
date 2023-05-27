import React from "react";
// import { useState } from "react";
import { Button } from "@mantine/core";

import { useStyles } from "./MusicStyle";
import CountDownClock from "./components/CountDownClock";

const MultipleChoice = ({
  options,
  selectedOption,
  onChange,
  answer,
  finalAnswer,
}) => {
  const { classes } = useStyles();
  const isCorrect = answer === selectedOption;

  return (
    <>
      <CountDownClock />
      <h1> Which song is this?????</h1>
      <Button.Group orientation="vertical">
        {options?.map((option) => (
          <Button
            className={classes.buttons_root}
            key={`${option.index}, ${option.song}, ${option.artist}`}
            // variant={selectedOption === option ? "filled" : "outline"}
            onClick={() => onChange(option)}
            disabled={selectedOption !== null}
            color={
              isCorrect && option === answer
                ? "teal"
                : selectedOption !== null && option === answer
                ? "teal"
                : "gray"
            }
          >
            {`${option?.song}`}
          </Button>
        ))}
      </Button.Group>
      <>
        {selectedOption && (
          <>
            {selectedOption === answer ? (
              <h1
                style={{
                  color: "green",
                }}
              >
                Correct! <br /> Song Name: {finalAnswer.song} <br />
                Artist: {finalAnswer.artist} <br />
                Year: {finalAnswer.year}
              </h1>
            ) : (
              <h1 style={{ color: "red" }}>
                Incorrect! <br /> Song Name: {finalAnswer.song} <br />
                Artist: {finalAnswer.artist} <br /> Year: {finalAnswer.year}
              </h1>
            )}
          </>
        )}
      </>
    </>
  );
};

export default MultipleChoice;
