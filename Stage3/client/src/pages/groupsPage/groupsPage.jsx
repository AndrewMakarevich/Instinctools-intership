import { Link, Outlet } from "react-router-dom";
import pageStyles from "./groupsPage.module.css";

const GroupsPage = () => {
  return (
    <article>
      Groups page
      <Link to="Super-dooper">Super-dooper group</Link>
      <Outlet />
    </article>
  )
};

export default GroupsPage;