import { createStyles } from "@mantine/core";

const color_theme = "#364e68";
export const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // margin: "center",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  buttons_root: {
    backgroundColor: color_theme,
    border: 0,
    // height: rem(42),
    // paddingLeft: rem(20),
    // paddingRight: rem(20),
    "&:not([data-disabled])": theme.fn.hover({
      backgroundColor: theme.fn.lighten(color_theme, 0.05),
    }),
  },

  audio_card: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    width: "50%",
    margin: "auto",
  },
  audio_control: {
    borderRadius: "75%",
    backgroundColor: color_theme,
    color: color_theme,
    "&:not([data-disabled])": theme.fn.hover({
      backgroundColor: theme.fn.lighten(color_theme, 0.05),
    }),
  },
  grid_track: {
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
    fontSize: 25,
    lineHeight: 1,
    marginBottom: 5,
  },

  // Timer:
  h1: {
    fontFamily: "Roboto",
    textAlign: "center",
    marginBottom: 40,
  },
  "timer-wrapper": {
    display: "flex",
    justifyContent: "center",
  },
  "time-wrapper": {
    position: "relative",
    width: 80,
    height: 60,
    fontSize: 48,
    fontFamily: "Montserrat",
  },
  "time-wrapper .time": {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: "translateY(0)",
    opacity: 1,
    transition: "all 0.2s",
  },
  "time-wrapper .time.up": {
    opacity: 0,
    transform: "translateY(-100%)",
  },
  "time-wrapper .time.down": {
    opacity: 0,
    transform: "translateY(100%)",
  },
}));
