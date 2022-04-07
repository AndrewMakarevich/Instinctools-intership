import MyLink from "../../../UI/myLink/myLink";
import itemStyles from "./userItem.module.css";

const UserItem = ({ user }) => {
  return (
    <li className={itemStyles["user-item"]}>
      <MyLink className={itemStyles["edit-user-link"]} to={user.username}></MyLink>
      <p>Username: {user.username}</p>
      <hr></hr>
      <p>Full name: {user.firstName} {user.lastName}</p>
    </li>
  )
};
export default UserItem;