import { Slider } from "@mantine/core";
import { useState } from "react";

function TimeSlider({ onTimeChange }) {
  const startTime = new Date();
  startTime.setHours(9, 31, 0, 0);
  const endTime = new Date();
  endTime.setHours(16, 15, 0, 0);

  const timeRange = [];
  let currentTime = new Date(startTime);

  while (currentTime <= endTime) {
    const militaryTime = currentTime.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    timeRange.push(militaryTime);
    currentTime.setMinutes(currentTime.getMinutes() + 1);
  }

  const [currentTimeValue, setCurrentTimeValue] = useState(0);

  const handleSliderChange = (value) => {
    setCurrentTimeValue(value);
    onTimeChange(timeRange[value]);
  };

  return (
    <Slider
      labelAlwaysOn
      min={0}
      max={timeRange.length - 1}
      step={1}
      // marks={[
      //   { value: 0, label: timeRange[0] },
      //   { value: timeRange.length - 1, label: timeRange[timeRange.length - 1] },
      // ]}
      marks={timeRange.reduce(
        (acc, val, i) =>
          i % 30 === 0 ? [...acc, { value: i, label: val }] : acc,
        []
      )}
      label={(value) => timeRange[value]}
      value={currentTimeValue}
      onChange={handleSliderChange}
    />
  );
}

export default TimeSlider;
