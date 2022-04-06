import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroups } from "../../../store/reducers/groupReducer/actionCreators";
import MyLink from "../../../UI/myLink/myLink"

const GroupList = () => {
  const dispatch = useDispatch();
  const groupReducer = useSelector(state => state.groupReducer.groups);

  useEffect(() => {
    dispatch(getGroups());
  }, []);

  return (
    <article>
      <ul>
        {
          groupReducer.length && groupReducer.map(group => {
            return <li key={group._id}><MyLink to={group.groupName}>{JSON.stringify(group)}</MyLink></li>
          })
        }
      </ul>

    </article>
  )
};

export default GroupList;