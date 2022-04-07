import { Link, Outlet } from "react-router-dom";
import GroupList from "../../components/groups/groupList/groupList";

const GroupsPage = () => {
  return (
    <article>
      Groups page
      <GroupList />
    </article>
  )
};

export default GroupsPage;