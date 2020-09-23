import React, { useState } from "react";
import {
  Box,
  Container,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import useStyles from "./styles";
import SearchBar from "material-ui-search-bar";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "redux/actions/authActions";

import lodash from "lodash";

export const Navbar = () => {
  const classes = useStyles();
  const history = useHistory();

  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [profileMenu, setProfileMenu] = useState(null);

  const handleClick = (event) => setProfileMenu(event.currentTarget);

  const handleClose = () => setProfileMenu(null);

  const onLogout = () => {
    dispatch(logout());
    handleClose();
  };
  const toHome = () => history.push("/");
  const toAdmin = () => history.push("/admin/dashboard");
  const toLogin = () => history.push("/login");
  const toProfile = () => {
    history.push("/profile");
    handleClose();
  };
  return (
    <Box style={{ background: "white" }}>
      <Box component={Container} maxWidth="lg" className={classes.Navbar}>
        <Box md={2} className={classes.Left}>
          <Button onClick={toHome} color="inherit">
            <Typography
              className={classes.title}
              variant="h5"
              align="center"
              noWrap
            >
              NnyhS
            </Typography>
          </Button>
        </Box>

        <Box className={classes.Right}>
          <SearchBar
            onChange={() => console.log("onChange")}
            onRequestSearch={() => console.log("onRequestSearch")}
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            // onFocus={() => console.log("focus")}
            // onBlur={() => console.log("Blur")}
            inputProps={{ "aria-label": "search" }}
          />
        </Box>
        {auth.isAuthenticated ? (
          <IconButton onClick={handleClick}>
            <i className="fad fa-user"></i>
          </IconButton>
        ) : (
          <IconButton onClick={toLogin}>
            <i className="fad fa-user"></i>
          </IconButton>
        )}
        <IconButton>
          <i className="fad fa-shopping-cart"></i>
        </IconButton>

        <Menu
          id="simple-menu"
          anchorEl={profileMenu}
          keepMounted
          open={Boolean(profileMenu)}
          onClose={handleClose}
        >
          {auth.user &&
          auth.roles &&
          lodash.includes(auth.user.roles, auth.roles.Administrator) ? (
            <MenuItem onClick={toAdmin}>Admin</MenuItem>
          ) : null}
          <MenuItem onClick={toProfile}>Profile</MenuItem>
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};
