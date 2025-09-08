import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: { mode: "light" },
  components: {
    MuiContainer: { defaultProps: { maxWidth: "md" } },
    MuiPaper: { styleOverrides: { root: { borderRadius: 12 } } },
  },
});

export default theme;
