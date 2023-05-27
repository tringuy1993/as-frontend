import { Group, Select, UnstyledButton } from "@mantine/core";

import { useStyles } from "./SelectStyles";
function SelectGreek({ value, onChange }) {
  const { classes } = useStyles();
  const data = [
    { label: "Gamma", value: "gamma" },
    { label: "Vanna", value: "vanna" },
    { label: "Charm", value: "charm" },
    { label: "Delta", value: "delta" },
    { label: "Theta", value: "theta" },
    { label: "Vomma", value: "vomma" },
  ];
  return (
    <UnstyledButton>
      <Group>
        <>Select Greek:</>
        <Select
          className={classes.dropdown}
          // label="Select Your Greek:"
          placeholder="Pick one"
          onChange={onChange}
          value={value}
          data={data}
        />
      </Group>
    </UnstyledButton>
  );
}

export default SelectGreek;
