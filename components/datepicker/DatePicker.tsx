import { DatePickerInput } from "@mantine/dates";
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { startOfWeek } from "date-fns";
import { useStyles } from "./DatePickerStyle";
import { DatePickerProps } from "./types";

function getNextFriday2(date = new Date()) {
  const dateCopy = new Date(date.getTime());

  const nextFriday = new Date(
    dateCopy.setDate(
      dateCopy.getDate() + ((7 - dateCopy.getDay() + 5) % 7 || 7)
    )
  );

  return nextFriday;
}

function disableDatesBeforeThisWeek(date: Date): boolean {
  return date < startOfWeek(new Date(), { weekStartsOn: 0 });
}

function DatePicker({ dateRange, onSubmit, BackTest }: DatePickerProps) {
  //Work!
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      dateRange: dateRange,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <Group align={"center"} className={classes.group}>
        <DatePickerInput
          type="range"
          className={classes.input}
          placeholder="Pick Expiration Date"
          firstDayOfWeek={0}
          clearable={false}
          excludeDate={BackTest ? true : disableDatesBeforeThisWeek}
          allowSingleDateInRange
          {...form.getInputProps("dateRange")}
        ></DatePickerInput>
        <Button type="submit"> Submit Date </Button>
      </Group>
    </form>
  );
}

export default DatePicker;
