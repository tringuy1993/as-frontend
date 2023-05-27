import React, { useState, useRef, useEffect } from "react";
import { Slider, Card, Text, ActionIcon, Grid } from "@mantine/core";
import { FaPlay, FaPause } from "react-icons/fa";
import { useStyles } from "../MusicStyle";

const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
};

function PlayAudio({ src, onEnded, selectedSong }) {
  const { classes } = useStyles();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying((prev) => !prev);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleVolumeChange = (value) => {
    setVolume(value);
    audioRef.current.volume = value / 100;
  };

  function handleLoadedMetadata(e) {
    setDuration(e.target.duration);
  }

  useEffect(() => {
    setIsPlaying(false);
  }, [src]);

  // When song finished change to Play again.
  const handleSongEnd = () => {
    setIsPlaying(false);
  };

  useEffect(() => {
    setIsPlaying(false);
    const audioElement = audioRef.current;
    audioElement.addEventListener("ended", handleSongEnd);
    return () => {
      audioElement.removeEventListener("ended", handleSongEnd);
    };
  }, []);

  return (
    <Card className={classes.audio_card} withBorder radius="md">
      <audio
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={onEnded}
        controls={false}
        ref={audioRef}
      />
      {/* <Card.Section>
        <h1>Song Selected {selectedSong}</h1>
      </Card.Section> */}
      <Text className={classes.label}>Song selected: {selectedSong}</Text>
      <Grid gutter={2} align="center" justify="center">
        <Grid.Col span="content">
          <ActionIcon
            onClick={togglePlay}
            size={"4rem"}
            className={classes.audio_control}
          >
            {isPlaying ? (
              <FaPause style={{ fontSize: 32, color: "#FFFFFF" }} />
            ) : (
              <FaPlay style={{ fontSize: 32, color: "#FFFFFF" }} />
            )}
          </ActionIcon>
        </Grid.Col>
        <Grid.Col span="auto">
          <Slider
            value={currentTime}
            marks={[
              { value: 0, label: currentTime.toFixed(1) },
              { value: 100, label: duration.toFixed(1) },
            ]}
            color="cyan"
            min={0}
            max={duration || 0}
            step={1}
            label={`Progress: ${formatTime(currentTime)} / ${formatTime(
              duration
            )}`}
            labelTransition="fade"
            disabled={!duration}
          />
        </Grid.Col>
      </Grid>

      {/* <Slider
          value={volume}
          onChange={handleVolumeChange}
          min={0}
          max={100}
          step={1}
          label={`Volume: ${volume}%`}
        /> */}
    </Card>
  );
}

export default PlayAudio;
