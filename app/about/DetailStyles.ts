import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  card: {
    height: "450px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
    alignItems: "flex-end",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },

  category: {
    // color: theme.black,
    opacity: 1,
    fontWeight: 700,
    textTransform: "uppercase",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[1],
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  carousel: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[1],
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderRadius: 10,

    maxWidth: 650,
    maxHeight: 650,
  },
}));
