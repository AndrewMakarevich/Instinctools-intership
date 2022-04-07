import MyLink from "../../../UI/myLink/myLink";
import itemStyles from "./groupItem.module.css";

const GroupItem = ({ group }) => {
  return (
    <li key={group._id} className={itemStyles["group-item"]}>
      <MyLink className={itemStyles["edit-group-link"]} to={group.groupName}></MyLink>
      <p>Group name: {group.groupName}</p>
      <hr></hr>
      <p>Group title: {group.groupTitle}</p>
    </li>
  )
};

export default GroupItem;