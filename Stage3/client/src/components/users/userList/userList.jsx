import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDelayFetching from "../../../hooks/useDelayFetching";
import { getUsers } from "../../../store/reducers/userReducer/actionCreators";
import SearchInput from "../../../UI/searchInput/searchInput";
import PaginationLine from "../../paginationLine/paginationLine";
import UserItem from "../userItem/userItem";
import listStyles from "./userList.module.css";

const UserList = () => {
  const [queryParams, setQueryParams] = useState({
    filterObject: {},
    page: 1,
    limit: 1
  });
  const dispatch = useDispatch();
  const userReducer = useSelector(state => state.userReducer);

  const [fetchUsers, usersAreLoading] = useDelayFetching(() => dispatch(getUsers(queryParams)), 200);


  useEffect(() => {
    fetchUsers();
  }, [queryParams]);

  return (
    <article className={listStyles["user-list-wrapper"]}>
      <SearchInput placeholder="Search by username" onChange={(e) => setQueryParams({ ...queryParams, filterObject: { ...queryParams.filterObject, username: e.target.value } })} />
      <ul className={`${listStyles["user-list"]} ${usersAreLoading ? listStyles["loading"] : ""}`}>
        {
          userReducer.users.length && userReducer.users.map(user =>
            <UserItem key={user._id} user={user} />
          )
        }
      </ul>
      <PaginationLine count={userReducer.count} page={queryParams.page} limit={queryParams.limit} setPage={(page) => { setQueryParams({ ...queryParams, page }) }} />
    </article>
  )
};

export default UserList;