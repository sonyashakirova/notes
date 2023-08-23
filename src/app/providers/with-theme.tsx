import { createTheme, ThemeProvider } from "@mui/material/styles";
import { purple, lime } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: lime,
    secondary: purple,
  },
});

export const withTheme = (component: () => React.ReactNode) => () =>
  <ThemeProvider theme={theme}>{component()}</ThemeProvider>;
