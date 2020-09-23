import { makeStyles } from "@material-ui/core";
import banner from "assets/img/banner.svg";

export default makeStyles((theme) => ({
  Paper: {
    maxWidth: "100%",
    height: "480px",
    padding: theme.spacing(2),
    background: "#ffeebb",
    borderRadius: theme.spacing(4),
  },
  ImgLeft: {
    backgroundImage: `url(${banner})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  Right: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    position: "relative",
    "& .MuiButton-textPrimary": {
      position: "absolute",
      bottom: 20,
      right: 30,
    },
    padding: theme.spacing(0, 0, 0, 2),
  },
}));
