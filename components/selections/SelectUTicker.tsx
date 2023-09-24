import { Group, Select, UnstyledButton } from "@mantine/core";

import { useStyles } from "./SelectStyles";
import useFetch from "@/app/api/useFetch";
import useSelectedUTickerStore from "@/store/Live0DTE/live0DTEUTickerStore";
import { LIVE_OTM_UTICKERS } from "@/app/api/apiURLs";

function SelectUTicker() {
  const { classes } = useStyles();
  const selectedUTicker = useSelectedUTickerStore(
    (state) => state.selectedUTicker
  );
  const setSelectedUTicker = useSelectedUTickerStore(
    (state) => state.setSelectedUTicker
  );

  const UPDATE_INTERVAL = 0;
  const { data } = useFetch(
    {},
    LIVE_OTM_UTICKERS,
    [selectedUTicker],
    UPDATE_INTERVAL
  );

  let convertedArray;

  if (data) {
    convertedArray = data?.data.map((item) => ({
      label: item.uticker,
      value: item.uticker,
    }));
  }

  const handleSelectChange = (newValue) => {
    setSelectedUTicker(newValue);
  };

  return (
    <>
      {data && (
        <UnstyledButton>
          <Group>
            <>Select Ticker:</>
            <Select
              className={classes.dropdown}
              placeholder="Pick one"
              onChange={handleSelectChange}
              value={selectedUTicker}
              data={convertedArray}
            />
          </Group>
        </UnstyledButton>
      )}
    </>
  );
}

export default SelectUTicker;
