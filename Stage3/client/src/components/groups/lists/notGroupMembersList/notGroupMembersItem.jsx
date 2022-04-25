const NotGroupMembersItem = ({ user }) => {
  return (
    <tr>
      <td>{user.username}</td>
      <td>
        {user.firstName} {user.lasName}
      </td>
      <td>{user.email}</td>
      <td>
        <button>Add</button>
      </td>
    </tr>
  );
};

export default NotGroupMembersItem;
