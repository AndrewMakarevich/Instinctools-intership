import GroupPage from "../../pages/groupPage/groupPage";
import GroupsPage from "../../pages/groupsPage/groupsPage";
import UserPage from "../../pages/userPage/userPage";
import UsersPage from "../../pages/usersPage/usersPage";

const publicRoutes = [
  {
    id: 0,
    name: "Users",
    path: "/users",
    Element: UsersPage,
    subRoutes: [
      {
        id: 0,
        name: "User",
        path: ":username",
        Element: UserPage
      }
    ]
  },
  {
    id: 1,
    name: "Groups",
    path: "/groups",
    Element: GroupsPage,
    subRoutes: [
      {
        id: 0,
        name: "Group",
        path: ":groupname",
        Element: GroupPage
      }
    ]
  }
];

export default publicRoutes;