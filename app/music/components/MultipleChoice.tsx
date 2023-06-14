import React from "react";
// import { useState } from "react";
import { Button } from "@mantine/core";

import { useStyles } from "../styles";
import CountDownClock from "./CountDownClock";

const MultipleChoice = ({
  options,
  selectedOption,
  answerYear,
  onChange,
  answer,
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
                Correct! <br /> Song Name: {answer.song} <br />
                Artist: {answer.artist} <br />
                Year: {answerYear.year}
              </h1>
            ) : (
              <h1 style={{ color: "red" }}>
                Incorrect! <br /> Song Name: {answer.song} <br />
                Artist: {answer.artist} <br />
                Year: {answerYear.year}
              </h1>
            )}
          </>
        )}
      </>
    </>
  );
};

export default MultipleChoice;
