// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import People from "@material-ui/icons/People";
// core components/views for Admin layout
import DashboardPage from "views/Admin/Dashboard";
// import UserProfile from "views/Admin/UserProfile";
// import TableList from "views/Admin/TableList";
// import Maps from "views/Admin/Maps";
// core components/views for User layout
import { ListUsers } from "views/Admin/ListUsers";

const dashboardRoutes = [
  //  ADMIN LAYOUT
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "Users",
    icon: People,
    component: ListUsers,
    layout: "/admin",
  },
  // {
  //   path: "/user/:id",
  //   name: "User",
  //   icon: Person,
  //   component: UserProfile,
  //   hidden: true,
  //   layout: "/admin",
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: LocationOn,
  //   component: Maps,
  //   layout: "/admin",
  // },
];

export default dashboardRoutes;
