"use client";
import { useEffect, useState } from "react";
import { fetchMusicData } from "../api/fetchMusicData";
import { ANSWER_URL, SONGS_URL } from "@/app/api/apiURLs";
import { Box, Button, Card, Group } from "@mantine/core";
import PlayAudio from "../components/PlayAudio";
import MultipleChoice from "../components/MultipleChoice";
import { createRandomChoices } from "./utilities";
import { useStyles } from "../styles";

const GenreView2 = ({ params }: { params: { genre: string } }) => {
  const { classes } = useStyles();
  const paramsz = {
    params: { genre: params.genre },
  };
  // Song Names
  const [songsNames, setSongsNames] = useState({
    key: params.genre,
    defaultValue: "",
  });

  //Audio
  const [audioSrc, setAudioSrc] = useState("");
  const [isAudioStopped, setIsAudioStopped] = useState(false); // New state variable
  const handleAudioEnded = (): void => {
    setIsAudioStopped(true); // Set isAudioPlaying to false when the audio ends
  };
  const [loadedAudio, setLoadedAudio] = useState(false);

  //Select Song for play for audio
  const [selectedSong, setSelectedSong] = useState({});
  const handleSelectSong = (songObj) => {
    // Get Song to play when button pressed.
    setSelectedSong(songObj);
    fetchSong(songObj?.index);
    console.log("selectedSong:", songObj);
    //Create Multiple Choice Options
    setOptions(() => createRandomChoices(songsNames, songObj));

    //Stop the music and stop timmer multiplechoice shows up
    setIsAudioStopped(false);

    //Clear previously selected answer.
    setSelectedOption(null);
  };

  // Prepare to pass props into Multiple Choice answers
  const [options, setOptions] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answerYear, setAnswerYear] = useState();

  //Opening page to get all songs.
  const fetchData = async () => {
    const response = await fetchMusicData({ url: ANSWER_URL, params: paramsz });
    setSongsNames(response?.data);
  };

  const fetchSong = async (selectedSongNumber) => {
    //Fetch music
    setLoadedAudio(true);

    const query_params = {
      responseType: "blob",
      params: {
        genre: `/${params.genre}`,
        song_number: selectedSongNumber,
      },
    };
    const response = await fetchMusicData({
      url: SONGS_URL,
      params: query_params,
    });
    //retrieving Answer with year.
    const contentType = response?.headers?.get("content-type");
    if (contentType?.startsWith("multipart/x-mixed-replace")) {
      const answer_year = JSON.parse(contentType?.split("boundary=")[1]);
      setAnswerYear(() => {
        return answer_year;
      });
    }
    const audioBlob = new Blob([response?.data], { type: "audio/mpeg" });
    setAudioSrc(() => {
      return URL.createObjectURL(audioBlob);
    });
    setLoadedAudio(false);
    return URL.createObjectURL(audioBlob);
  };

  const buttons = [];
  for (let i = 0; i < songsNames?.length; i++) {
    // console.log(i, JSON.stringify(songsNames[i]));
    buttons.push(
      <Button
        key={JSON.stringify(songsNames[i])}
        onClick={() => handleSelectSong(songsNames[i])}
        className={classes.buttons_root}
      >
        {songsNames[i].index}
      </Button>
    );
  }

  function handleMCSelection(option) {
    // Multiple Choice Selection
    setSelectedOption(() => {
      return option;
    });
  }

  useEffect(() => {
    //Stop the music and stop timmer multiplechoice shows up
    setIsAudioStopped(false);
    setSelectedSong({});
    //Clear previously selected answer.
    setAudioSrc("");
    setSelectedOption(null);
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.genre]);

  return (
    <>
      <Card withBorder radius="md" className={classes.card}>
        <Group position="center">{buttons}</Group>
      </Card>
      {/* {`${Object.keys(selectedSong)} ${loadedAudio}`} */}
      <Box pos="relative">
        {/* <LoadingOverlay
              visible={loadedAudio}
              overlayBlur={2}
            ></LoadingOverlay> */}
        {Object.keys(selectedSong) && audioSrc && !loadedAudio && (
          <PlayAudio
            src={audioSrc}
            onEnded={handleAudioEnded}
            selectedSong={selectedSong?.index}
          />
        )}

        {isAudioStopped && (
          <MultipleChoice
            options={options}
            answer={selectedSong}
            answerYear={answerYear}
            selectedOption={selectedOption}
            onChange={handleMCSelection}
          ></MultipleChoice>
        )}
      </Box>
    </>
  );
};

export default GenreView2;
