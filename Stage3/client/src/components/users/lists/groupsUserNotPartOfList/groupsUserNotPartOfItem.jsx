const GroupsUserNotPartOfItem = ({ group }) => {
  return (
    <tr>
      <td>{group.groupName}</td>
      <td>{group.groupTitle}</td>
      <td>
        <button></button>
      </td>
    </tr>
  );
};

export default GroupsUserNotPartOfItem;
