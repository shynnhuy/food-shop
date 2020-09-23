/* eslint-disable react/prop-types */
import React from "react";
import { Box, CssBaseline } from "@material-ui/core";
import { Redirect, Route } from "react-router-dom";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { ThemeProvider } from "@material-ui/core";
import { Navbar } from "components/User";
import theme from "assets/theme";
import { useSelector } from "react-redux";

function UserLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <Navbar />
        {children}
      </Box>
    </ThemeProvider>
  );
}

const UserRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (rest.auth && !auth.isAuthenticated) {
          return <Redirect to="/" />;
        }
        return (
          <UserLayout>
            <Component {...props} />
          </UserLayout>
        );
      }}
    />
  );
};

export default UserRoute;
