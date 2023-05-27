import React, { useEffect } from "react";
import { useState } from "react";
import { SONGS_URL } from "../../constants";
import { getMusicData } from "./getMusicData";
import MultipleChoice from "./MultipleChoice";
import { findSongByIndex, selectRandomAnswers } from "./getMusic";
import PlayAudio from "./components/PlayAudio";
import { Card, Button, Group, LoadingOverlay, Box } from "@mantine/core";
import { useStyles } from "./MusicStyle";

function PageSongs({ genre, songs, answers }) {
  const { classes } = useStyles();
  // Genre page with button songs.
  const [selectedSong, setSelectedSong] = useState(1);
  const [audioSrc, setAudioSrc] = useState("");
  const [loadedAudio, setLoadedAudio] = useState(false);

  // Prepare to pass props into Multiple Choice answers
  const [options, setOptions] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [songAnswer, setSongAnswer] = useState();
  const [finalAnswer, setFinalAnswer] = useState();

  // Audio Player State:
  const [isAudioStopped, setIsAudioStopped] = useState(false); // New state variable
  const handleAudioEnded = () => {
    setIsAudioStopped(true); // Set isAudioPlaying to false when the audio ends
  };

  async function fetchData() {
    //Fetch music
    setLoadedAudio(true);
    const params = {
      responseType: "blob",
      params: { genre: genre, song_number: selectedSong },
    };
    const response = await getMusicData({ url: SONGS_URL, params: params });
    //retrieving Answer with year.
    const contentType = response?.headers?.get("content-type");
    if (contentType?.startsWith("multipart/x-mixed-replace")) {
      const answer_year = JSON.parse(contentType?.split("boundary=")[1]);
      setFinalAnswer(() => {
        return answer_year;
      });
    }
    const audioBlob = new Blob([response?.data], { type: "audio/mpeg" });
    const audioUrl = URL.createObjectURL(audioBlob);
    setAudioSrc(() => {
      return audioUrl;
    });
    setLoadedAudio(false);
  }

  function handleSelectionChange(option) {
    // Multiple Choice Selection
    setSelectedOption(() => {
      return option;
    });
  }

  const handleClick = (buttonIndex) => {
    // Get Song to play when button pressed.
    setSelectedSong(buttonIndex);
  };

  useEffect(() => {
    // Get Song to play when Song buttons pressed.
    fetchData();
    // Set songAnswer to pass into MC prop
    if (selectedSong) {
      setSongAnswer(() => findSongByIndex(answers, selectedSong));
    }
    //Don't show Multiple Choice
    setIsAudioStopped(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSong]);

  useEffect(() => {
    //Once selectedSong is completed, update songAnswer and options.
    if (songAnswer) {
      setOptions(() => selectRandomAnswers(answers, songAnswer));
    }
    setSelectedOption(null);
    // setLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [songAnswer]);

  // Mapping all the buttons with the number of songs
  const buttons = [];
  for (let i = 1; i <= answers?.length; i++) {
    buttons.push(
      <Button
        key={i}
        onClick={() => handleClick(i)}
        className={classes.buttons_root}
      >
        {i}
      </Button>
    );
  }

  // if (loading) {
  return (
    <div>
      <h1>Welcome to {genre.substring(1)} songs</h1>

      <Card withBorder radius="md" className={classes.card}>
        <Group position="center">{buttons}</Group>
      </Card>
      <br></br>
      {songAnswer ? (
        <>
          <Box pos="relative">
            <LoadingOverlay
              visible={loadedAudio}
              overlayBlur={2}
            ></LoadingOverlay>
            <PlayAudio
              src={audioSrc}
              onEnded={handleAudioEnded}
              selectedSong={selectedSong}
            />
          </Box>
          <br></br>

          {isAudioStopped && (
            <MultipleChoice
              options={options}
              answer={songAnswer}
              finalAnswer={finalAnswer}
              selectedOption={selectedOption}
              onChange={handleSelectionChange}
            ></MultipleChoice>
          )}
        </>
      ) : (
        <p>Select a song to start the game!</p>
      )}
    </div>
  );
}
// }

export default PageSongs;
