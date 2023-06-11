import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  theme: {
    paddingTop: "5rem",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.white,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
}));
