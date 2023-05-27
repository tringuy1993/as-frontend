import { TimeInput } from "@mantine/dates";
import { BsClock } from "react-icons/bs";

function TimePicker({ onTimeChange }) {
  //   const ref = useRef();

  const handleTimeChange = (value) => {
    // Call the onTimeChange callback with the selected time value
    if (onTimeChange) {
      onTimeChange(value);
    }
  };
  return (
    <TimeInput
      label="Click click icon to show browser picker"
      icon={<BsClock size="1rem" stroke={1.5} />}
      maw={400}
      mx="auto"
      onChange={handleTimeChange}
    />
  );
}

export default TimePicker;
