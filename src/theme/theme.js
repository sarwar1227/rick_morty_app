import { createTheme } from "@mui/material/styles";

const getAppTheme = () =>
  createTheme({
    palette: {
      background: {
        default: "#fafafa"
      }
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          fontSize: "62.5%"
        }
      },
      MuiStack: {
        defaultProps: {
          direction: "row"
        }
      },
      MuiButton: {
        defaultProps: {
          variant: "contained",
          disableElevation: true
        }
      }
    },
    typography: {
      fontSize: 10,
      fontFamily: [
        "Ubuntu",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif"
      ].join(",")
    },
    spacing: (factor) => `${factor * 1}rem`
  });

export default getAppTheme;
