import { Group, Select, UnstyledButton } from "@mantine/core";

import { useStyles } from "./SelectStyles";
function SelectTicker({ value, onChange }) {
  const { classes } = useStyles();
  const data = [
    { label: "ES", value: "ES" },
    { label: "SPX", value: "$SPX.X" },
    { label: "VIX", value: "$VIX.X" },
    { label: "SPY", value: "SPY" },
    { label: "QQQ", value: "QQQ" },
    { label: "IWM", value: "IWM" },
    { label: "NDX", value: "$NDX.X" },
  ];
  return (
    <UnstyledButton>
      <Group>
        <>Select Ticker:</>
        <Select
          className={classes.dropdown}
          placeholder="Pick one"
          onChange={onChange}
          value={value}
          data={data}
        />
      </Group>
    </UnstyledButton>
  );
}

export default SelectTicker;
