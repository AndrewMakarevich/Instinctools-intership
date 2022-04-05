import GroupsPage from "../../pages/groupsPage/groupsPage";
import UsersPage from "../../pages/usersPage/usersPage";

const publicRoutes = [
  {
    id: 0,
    name: "Users",
    path: "/users",
    Element: UsersPage
  },
  {
    id: 1,
    name: "Groups",
    path: "/groups",
    Element: GroupsPage
  }
];

export default publicRoutes;