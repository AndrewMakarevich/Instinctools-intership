import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../store/reducers/userReducer/actionCreators";
import UserItem from "../userItem/userItem";
import listStyles from "./userList.module.css";

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.userReducer.users);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <article>
      <ul className={listStyles["user-list"]}>
        {
          users.length && users.map(user =>
            <UserItem key={user._id} user={user} />
          )
        }
      </ul>
    </article>
  )
};

export default UserList;