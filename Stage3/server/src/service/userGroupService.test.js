const GetMongoMemoryServer = require('../db/testDb');
const { expandMongooseMethods } = require('../db');
const UserGroupService = require('./userGroupService');
const UserService = require('./userService');
const GroupService = require('./groupService');
const { correctUserObj, correctGroupObj } = require('./consts.mock');

let server;

beforeAll(async () => {
  server = await GetMongoMemoryServer();
  await server.connect();
});

afterEach(async () => {
  await server.cleanDataBase();
});

afterAll(async () => {
  await server.disconnect();
});

async function createTestUser(myUsername, myFirstName, myLastName, myEmail) {
  const { username, firstName, lastName, email } = correctUserObj;
  const testUser = await UserService.createUser(
    myUsername || username,
    myFirstName || firstName,
    myLastName || lastName,
    myEmail || email
  );

  return testUser.user[0];
}

async function createTestGroup(myName, myTitle) {
  const { groupName, groupTitle } = correctGroupObj;
  const testGroup = await GroupService.createGroup(
    myName || groupName,
    myTitle || groupTitle
  );

  return testGroup.group[0];
}

describe('UserGroupService: getting user groups', () => {
  test('Trying to get groups of an existing user', async () => {
    const testUser = await createTestUser();
    const testGroup1 = await createTestGroup();
    const testGroup2 = await createTestGroup('Ninth-group', 'fooboo');

    const createConnection1 = await UserGroupService.addUserToGroup(
      testUser._id,
      testGroup1._id
    );
    const createConnection2 = await UserGroupService.addUserToGroup(
      testUser._id,
      testGroup2._id
    );

    const userGroups = await UserGroupService.getUsersGroups(
      testUser._id,
      '{"groupName": "Nin"}',
      1,
      2
    );
    userGroups.rows = userGroups.rows.map((userGroup) => String(userGroup._id));

    expect(userGroups.rows).toEqual([String(testGroup2._id)]);
  });

  test('Trying to get groups of unexisting user', async () => {
    await expect(
      UserGroupService.getUsersGroups('624189fa131989eaef2453e3')
    ).rejects.toThrow("User with such id doesn't exists");
  });

  test('Trying to get users of an existing group', async () => {
    const testUser1 = await createTestUser();
    const testUser2 = await createTestUser(
      'Artyom',
      null,
      null,
      'artyom@mail.ru'
    );

    const testGroup = await createTestGroup();

    await UserGroupService.addUserToGroup(testUser1._id, testGroup._id);
    await UserGroupService.addUserToGroup(testUser2._id, testGroup._id);

    const groupUsers = await UserGroupService.getGroupUsers(
      testGroup._id,
      '{"username":"Art"}',
      1,
      2
    );

    groupUsers.rows = groupUsers.rows.map((groupUser) => String(groupUser._id));

    expect(groupUsers.rows).toEqual([String(testUser2._id)]);
  });

  test('Trying to get users of unexisting group', async () => {
    await expect(
      UserGroupService.getGroupUsers('6241b1b517692d26ffbd18b3')
    ).rejects.toThrow("Group with such id doesn't exists");
  });
});

describe('UserGroupService: adding user to the group', () => {
  test('Trying to add an existing user to an existing group', async () => {
    const testUser = await createTestUser();
    const testGroup = await createTestGroup();
    const addingUserToGroupResponse = await UserGroupService.addUserToGroup(
      testUser._id,
      testGroup._id
    );
    const userGroupConnectionRecord =
      await UserGroupService.getUserGroupConnection(
        testUser._id,
        testGroup._id
      );

    expect(addingUserToGroupResponse.message).toBe(
      `User ${testUser.username} successfully added to the ${testGroup.groupName} group`
    );
    expect(userGroupConnectionRecord).not.toBeNull();
  });

  test('Trying to add an existing user to an existing group, when user is already in the group', async () => {
    const testUser = await createTestUser();
    const testGroup = await createTestGroup();
    const addUserToGroup = async () => {
      await UserGroupService.addUserToGroup(testUser._id, testGroup._id);
    };

    await addUserToGroup();
    await expect(addUserToGroup()).rejects.toThrow(
      'User is already in the group'
    );
  });

  test("Trying to add an unexisting user to the existing group with incorrect user's id", async () => {
    const testGroup = await createTestGroup();
    const addUserToGroupResponse = async () => {
      await UserGroupService.addUserToGroup('foo', testGroup._id);
    };

    await expect(addUserToGroupResponse()).rejects.toThrow(
      "Incorrect user's id"
    );
  });

  test("Trying to add an unexisitng user to the existing group with correct user's id", async () => {
    const testGroup = await createTestGroup();
    const addUserToGroupResponse = async () => {
      await UserGroupService.addUserToGroup(
        '6242f34aa787da293c733ef4',
        testGroup._id
      );
    };

    await expect(addUserToGroupResponse()).rejects.toThrow(
      "User you want add to the group, doesn't exists"
    );
  });

  test("Trying to add an existing user to the unexisting group with incorrect group's id", async () => {
    const testUser = await createTestUser();
    const addUserToGroupResponse = async () => {
      await UserGroupService.addUserToGroup(testUser._id, 'foo');
    };

    await expect(addUserToGroupResponse()).rejects.toThrow(
      "Incorrect group's id"
    );
  });

  test("Trying to add an existing user to the unexisting group with correct group's id", async () => {
    const testUser = await createTestUser();
    const addUserToGroupResponse = async () => {
      await UserGroupService.addUserToGroup(
        testUser._id,
        '6241b1b517692d26ffbd18b2'
      );
    };

    await expect(addUserToGroupResponse()).rejects.toThrow(
      "Group in what you want to add the User, doesn't exists"
    );
  });
});

describe('UserGroupService: deleting user from the group', () => {
  test('Trying to delete an existing connection between user and group', async () => {
    const user = await createTestUser();
    const group = await createTestGroup();

    await UserGroupService.addUserToGroup(user._id, group._id);

    const { message } = await UserGroupService.deleteUserFromGroup(
      user._id,
      group._id
    );

    await expect(message).toBe(
      `User ${user.username} successfully deleted from the group ${group.groupName}`
    );
  });

  test('Trying to delete an unexisting connection between user and group', async () => {
    const user = await createTestUser();
    const group = await createTestGroup();

    await expect(
      UserGroupService.deleteUserFromGroup(user._id, group._id)
    ).rejects.toThrow(
      `Connection between ${user.username}(User) and ${group.groupName}(Group) doesn't exists`
    );
  });

  test('Trying to delete an unexisting user from the group', async () => {
    const group = await createTestGroup();

    await expect(
      UserGroupService.deleteUserFromGroup(
        '6241b1b517692d26ffbd18b2',
        group._id
      )
    ).rejects.toThrow("User you want to delete from the group, doesn't exists");
  });

  test('Trying to delete a user from an unexisting group', async () => {
    const user = await createTestUser();

    await expect(
      UserGroupService.deleteUserFromGroup(user._id, '6241b1b517692d26ffbd18b2')
    ).rejects.toThrow(
      "Group in what you want to delete the User, doesn't exists"
    );
  });
});
