import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../../store/reducers/userReducer/actionCreators";
import UserItem from "../userItem/userItem";
import listStyles from "./userList.module.css";

const UserList = () => {
  const dispatch = useDispatch();
  const userReducer = useSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <article>
      <ul className={listStyles["user-list"]}>
        {
          userReducer.users.length && userReducer.users.map(user =>
            <UserItem key={user._id} user={user} />
          )
        }
      </ul>
    </article>
  )
};

export default UserList;