import pageStyles from "./userPage.module.css";
import { useParams } from "react-router-dom";

const UserPage = () => {
  const { username } = useParams();

  return (
    <article>
      <p>{username} user page</p>
    </article>
  )
};

export default UserPage;