import { Link, Outlet } from "react-router-dom";
import GroupList from "../../components/groups/groupList/groupList";

const GroupsPage = () => {
  return (
    <article>
      Groups page
      <Link to="Super-dooper">Super-dooper group</Link>
      <GroupList />
      <Outlet />
    </article>
  )
};

export default GroupsPage;