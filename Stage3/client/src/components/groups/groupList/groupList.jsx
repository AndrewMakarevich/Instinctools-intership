import listStyles from "./groupList.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../../../store/reducers/groupReducer/actionCreators";
import MyLink from "../../../UI/myLink/myLink"
import GroupItem from "../groupItem/groupItem";
import PaginationLine from "../../paginationLine/paginationLine";

const GroupList = () => {
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 2,
    filterObject: {}
  })
  const dispatch = useDispatch();
  const groupReducer = useSelector(state => state.groupReducer);

  useEffect(() => {
    dispatch(getGroups());
  }, []);

  return (
    <article>
      <ul className={listStyles["group-list"]}>
        {
          groupReducer.groups.length && groupReducer.groups.map(group =>
            <GroupItem key={group._id} group={group} />
          )
        }
      </ul>
      <PaginationLine count={112} page={queryParams.page} limit={queryParams.limit} setPage={(page) => { setQueryParams({ ...queryParams, page }) }} />
    </article>
  )
};

export default GroupList;