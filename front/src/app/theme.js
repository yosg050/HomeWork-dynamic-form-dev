import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: false,
      },
      styleOverrides: {
        root: {
          paddingLeft: "16px",
          paddingRight: "16px",
        },
      },
    },
  },
});

export default theme;
