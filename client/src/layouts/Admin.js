import React from "react";
import {  Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Admin/Navbars/Navbar.js";
import Footer from "components/Admin/Footer/Footer.js";
import Sidebar from "components/Admin/Sidebar/Sidebar.js";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/reactlogo.png";
import { useSelector } from "react-redux";

let ps;

const useStyles = makeStyles(styles);

function AdminLayout({ ...rest }) {
  const classes = useStyles();
  const mainPanel = React.createRef();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
        logoText={"NnyhS Admin"}
        logo={logo}
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={"red"}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        <div className={classes.content}>
          <div className={classes.container}>{rest.children}</div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

const AdminRoute = ({ component: Component, ...rest }) => {
  const auth = useSelector((state) => state.auth);
  // console.log(auth);
  if (
    auth.user &&
    auth.roles &&
    !auth.user.roles.includes(auth.roles.Administrator)
  ) {
    return <Redirect to="/" />;
  }
  return (
    <Route
      {...rest}
      render={(props) => (
        <AdminLayout {...props}>
          <Component {...props} />
        </AdminLayout>
      )}
    />
  );
};

export default AdminRoute;
