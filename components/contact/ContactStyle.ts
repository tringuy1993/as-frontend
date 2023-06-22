import { createStyles, rem } from "@mantine/core";

const getBackgroundColor = (theme) => {
  return theme.colorScheme === "dark" ? theme.black : theme.white;
};
const getTextColor = (theme) => {
  return theme.colorScheme === "dark" ? theme.white : theme.black;
};

export const useStyles = createStyles((theme) => {
  const backgroundColor = getBackgroundColor(theme);
  const textColor = getTextColor(theme);
  return {
    wrapper: {
      minHeight: 400,
      boxSizing: "border-box",
      backgroundColor: backgroundColor,
      borderRadius: theme.radius.md,
      color: textColor,
      padding: `calc(${theme.spacing.xl} * 2.5)`,

      [theme.fn.smallerThan("sm")]: {
        padding: `calc(${theme.spacing.xl} * 1.5)`,
      },
    },

    title: {
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
      color: textColor,
      lineHeight: 2,
    },

    description: {
      color: textColor,
      maxWidth: rem(300),
      [theme.fn.smallerThan("sm")]: {
        maxWidth: "100%",
      },
    },

    form: {
      padding: theme.spacing.xl,
      borderRadius: theme.radius.md,
      boxShadow: theme.shadows.lg,
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.gray[9]
          : theme.colors.gray[2],
    },

    fields: {
      color: textColor,
    },

    social: {
      color: theme.white,

      "&:hover": {
        color: theme.colors[theme.primaryColor][1],
      },
    },

    input: {
      backgroundColor: theme.white,
      borderColor: theme.colors.gray[4],
      color: theme.black,

      "&::placeholder": {
        color: theme.colors.gray[5],
      },
    },

    inputLabel: {
      color: theme.black,
    },

    control: {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.gray[7]
          : theme.colors.gray[2],
      color: textColor,
    },
  };
});
