import { Link, Outlet } from "react-router-dom";

const UsersPage = () => {
  return (
    <article>
      Users page
      <Link to="Andrew">Andrew</Link>
      <Outlet />
    </article>
  )
};

export default UsersPage;