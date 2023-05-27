import { DatePickerInput } from "@mantine/dates";
import { Button, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { startOfWeek } from "date-fns";
import { useStyles } from "./DatePickerStyle";

function getNextFriday2(date = new Date()) {
  const dateCopy = new Date(date.getTime());

  const nextFriday = new Date(
    dateCopy.setDate(
      dateCopy.getDate() + ((7 - dateCopy.getDay() + 5) % 7 || 7)
    )
  );

  return nextFriday;
}

function disableDatesBeforeThisWeek(date) {
  return date < startOfWeek(new Date(), { weekStartsOn: 0 });
}

function DatePicker({ dateRange, onSubmit, BackTest }) {
  //Work!
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      dateRange: dateRange,
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <Group align={"center"} justify={"center"} className={classes.group}>
        <DatePickerInput
          type="range"
          className={classes.input}
          placeholder="Pick Expiration Date"
          firstDayOfWeek="sunday"
          clearable={false}
          excludeDate={BackTest ? null : disableDatesBeforeThisWeek}
          allowSingleDateInRange
          value={dateRange}
          {...form.getInputProps("dateRange")}
          // {BackTest ? null : { excludeDate: disableDatesBeforeThisWeek }}
        ></DatePickerInput>
        <Button type="submit"> Submit Date </Button>
      </Group>
    </form>
  );
}

export default DatePicker;
