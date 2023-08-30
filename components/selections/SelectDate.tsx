import { Group, Select, UnstyledButton } from "@mantine/core";

import { useStyles } from "./SelectStyles";
import useFetch from "@/app/api/useFetch";
import { LIVE_OTM_DATES } from "@/app/api/apiURLs";
import useSelectedDateStore from "@/store/Live0DTE/live0DTEStore";

function SelectDate({ und_symbol }) {
  const { classes } = useStyles();

  const selectedDate = useSelectedDateStore((state) => state.selectedDate);
  const setSelectedDate = useSelectedDateStore(
    (state) => state.setSelectedDate
  );

  const PARAMS = { und_symbol: und_symbol };
  const UPDATE_INTERVAL = 0;
  const { data } = useFetch(
    PARAMS,
    LIVE_OTM_DATES,
    [und_symbol],
    UPDATE_INTERVAL
  );

  let convertedArray;
  const today = new Date().toISOString().split("T")[0];

  if (data) {
    convertedArray = data?.data.map((item) => ({
      label: item.saved_date,
      value: item.saved_date,
    }));
    convertedArray = [
      { label: `Live: ${today}`, value: today },
      ...convertedArray,
    ];
  }

  const handleSelectChange = (newValue) => {
    setSelectedDate(newValue);
  };

  return (
    <>
      {data && (
        <UnstyledButton>
          <Group>
            <>Select Date:</>
            <Select
              className={classes.dropdown}
              placeholder="Pick one"
              onChange={handleSelectChange}
              value={selectedDate}
              data={convertedArray}
            />
          </Group>
        </UnstyledButton>
      )}
    </>
  );
}

export default SelectDate;
