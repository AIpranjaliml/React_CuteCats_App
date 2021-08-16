import React from "react";
import logo from "./images/logo.png";
import "./styles.css";
import axios from "axios";
import {
  Button,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Card,
  CardContent,
  ImageList,
  ImageListItem,
  Slide,
  useScrollTrigger
} from "@material-ui/core";
import { Pets, Brightness4 } from "@material-ui/icons";

import { makeStyles } from "@material-ui/styles";
import theme from "./theme";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },

  title: {
    marginLeft: "16px",
    flexGrow: 1,
    color: "blue",
    fontFamily: "roboto",
    fontSize: "30px"
  },
  navbutton: {
    marginleft: "20px",
    marginRight: "40px",
    background: "#243cc4  ",
    color: "white",
    "&:hover": {
      background: "red",
      color: "blue"
    }
  }

  // button: {
  //   color: theme.palette.primary.lightA,
  //   background: theme.palette.primary.A,
  //   marginLeft: "40px",
  //   "&:hover": {
  //     color: theme.palette.secondary.light,
  //   },
  // },
}));
function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

// HideOnScroll.propTypes = {
//   children: PropTypes.element.isRequired,
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

export default function App() {
  const [background, toggleBackground] = React.useState(true);
  const [imagedata, setimagedata] = React.useState([]);
  const [change, setchange] = React.useState(true);
  React.useEffect(() => {
    axios
      .get(
        "https://api.thecatapi.com/v1/images/search?limit=9&page=2&order=DESC"
      )
      .then((res) => setimagedata(res.data));
  }, [change]);
  console.log(imagedata);
  const classes = useStyles();
  return (
    <>
      <HideOnScroll>
        <AppBar
          style={{
            background: background ? "#96a6e4" : "#001836",
            color: "#0336ff"
          }}
        >
          <Toolbar>
            <div className={classes.title}>
              <Pets />
              CUTECATS
            </div>
            <IconButton
              aria-label="delete"
              onClick={() => {
                toggleBackground(!background);
              }}
            >
              <Brightness4
                style={{ color: background ? "white" : "#0336ff" }}
              />
            </IconButton>
            <Button
              className={classes.navbutton}
              onClick={() => {
                setchange(!change);
              }}
            >
              Generate new
            </Button>
          </Toolbar>
        </AppBar>
        {/* <div className="Navbar">
      <div className="nav-com">hiias</div>
      <div className="nav-items ">
        <Button title={" generate new"} onClick={() => {}} />
      </div>
    </div> */}
      </HideOnScroll>
      <Toolbar />
      <div className="App">
        <main
          style={{
            background: background
              ? theme.palette.primary.main
              : theme.palette.secondary.main
          }}
        >
          <div className="heading">Welcome to world of Cats</div>
          <ImageList rowHeight={250} className={classes.imageList} cols={3}>
            {imagedata.map((item) => (
              <ImageListItem key={item.id} cols={1}>
                <img src={item.url} alt={item.title} />
              </ImageListItem>
            ))}
          </ImageList>
        </main>
        <footer>
          © 2021 <Pets /> CuteCats,Inc{" "}
        </footer>
      </div>
    </>
  );
}
