import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EditGroupForm from '../../components/groups/forms/editGroupForm/editGroupForm';
import GroupUsersModal from '../../components/groups/modals/groupUsersModal/groupUsersModal';
import useFetching from '../../hooks/useFetching';
import { getGroupThunk } from '../../store/reducers/groupReducer/actionCreators';

import { StyledEditGroupSection, StyledHeader } from './styled';

const GroupPage = () => {
  const { groupname } = useParams();
  const dispatch = useDispatch();
  const groupReducer = useSelector((store) => store.groupReducer);
  const fetchGroup = useCallback(async () => {
    await dispatch(getGroupThunk(groupname));
  }, [groupname]);

  const {
    executeCallback: getGroupByGroupName,
    isLoading: groupIsLoading,
    error: groupError,
  } = useFetching(fetchGroup);

  useEffect(() => {
    getGroupByGroupName();
  }, [groupname]);

  if (groupIsLoading) {
    return (
      <article>
        <p>Group is loading</p>
      </article>
    );
  }

  if (groupError) {
    return (
      <article>
        <p>
          {groupError.isAxiosError
            ? groupError.response.data.message
            : groupError.message}
        </p>
      </article>
    );
  }

  return (
    <article>
      {groupReducer.group ? (
        <StyledEditGroupSection>
          <StyledHeader>{groupname}</StyledHeader>
          <EditGroupForm
            groupObj={groupReducer.group}
            actualizeGroupInfo={fetchGroup}
          />
          <GroupUsersModal groupId={groupReducer.group._id} />
        </StyledEditGroupSection>
      ) : (
        <p>Can&apos;t find group with such groupname</p>
      )}
    </article>
  );
};

export default GroupPage;
