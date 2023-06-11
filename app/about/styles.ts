import { createStyles, rem } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  theme: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark : theme.colors.white,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },
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
    borderRadius: 20,
    maxWidth: 650,
    maxHeight: 650,

    [`@media (max-width: 550px)`]: {
      maxWidth: 425,
      maxHeight: 400,
    },
  },
  viewport: {
    borderRadius: "inherit",
    maxHeight: "inherit",
    maxWidth: "inherit",
  },
  root: {
    maxWidth: "unset",
    marginLeft: "250px",
    marginRight: "250px",
  },
  // dividerTheme: {
  //   borderBottomColor: theme.colorScheme === "dark" ? "white" : "black",
  // },

  grid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "left",
  },

  tldr: {
    marginLeft: "150px",
    marginRight: "150px",
    [`@media (max-width: 1250px)`]: {
      marginLeft: "20px",
      marginRight: "20px",
    },
  },

  list: {
    listStyle: "none",
    display: "flex",
    gap: rem(10),
    flexFlow: "wrap",
    justifyContent: "center",
    textAlign: "center",
  },
}));
