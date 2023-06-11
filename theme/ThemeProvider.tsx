import {
  MantineProvider,
  ColorSchemeProvider,
  ButtonStylesParams,
  DividerStylesParams,
} from "@mantine/core";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

function ThemeProvider({ children }) {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{
          colorScheme,
          components: {
            Title: {
              styles: (theme) => ({
                root: {
                  color:
                    theme.colorScheme === "dark" ? theme.white : theme.black,
                },
              }),
            },
          },
        }}
        withGlobalStyles
        withNormalizeCSS
      >
        {children}
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default ThemeProvider;
