import { createTheme } from "@material-ui/core";

export default createTheme({
  palette: {
    primary: {
      main: "#ededec",
      A: "red",
      navbar: "#001836"
    },
    secondary: {
      main: "#000f4d"
    },
    error: {
      main: "#FF7E7E"
    }
  },
  typography: {
    useNextVariants: true,
    h1: {
      fontSize: "20px"
    }
  }
});
