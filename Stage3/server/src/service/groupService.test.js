const GetMongoMemoryServer = require("../db/testDb");
const { expandMongooseMethods } = require('../db/index');
const GroupService = require("./groupService");
const { correctGroupObj, alterCorrectGroupObj, incorrectGroupObj } = require("./consts.mock");

expandMongooseMethods();

jest.setTimeout(30000);

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

async function createCorrectTestGroup() {
  const { groupName, groupTitle } = correctGroupObj;
  const testGroup = await GroupService.createGroup(groupName, groupTitle);

  return {
    group: testGroup.group[0],
    message: testGroup.message
  };
};

async function createAlterCorrectTestGroup() {
  const { groupName, groupTitle } = alterCorrectGroupObj;
  const testGroup = await GroupService.createGroup(groupName, groupTitle);

  return {
    group: testGroup.group[0],
    message: testGroup.message
  };
};

async function createIncorrectTestGroup() {
  const { groupName, groupTitle } = incorrectGroupObj;
  await GroupService.createGroup(groupName, groupTitle)
}

describe("Group service: group creating", () => {

  test("Correct group creating", async () => {
    const { message, group } = await createCorrectTestGroup()
    const createdGroup = await GroupService.getGroup('_id', group._id);

    expect(message).toBe(`Group ${group.groupName} created successfully`);
    expect(createdGroup.groupName).toBe(`${group.groupName}`);
    expect(createdGroup.groupTitle).toBe(`${group.groupTitle}`);
  });

  test("Trying to create a group with incorrect params", async () => {
    await expect(createIncorrectTestGroup())
      .rejects.toThrow("Group validation failed: groupName: Group's name doesn't match required pattern, groupTitle: Group's title doesn't match required pattern");
  });

  test("Trying to create a group with ununique group-name", async () => {
    await createCorrectTestGroup();
    await expect(createCorrectTestGroup()).rejects.toThrow("groupName for groups must be unique");
  });
});

describe("Group service: group searching", () => {
  test("Trying to find an existing record of the group", async () => {
    const { group } = await createCorrectTestGroup()
    const foundGroup = await GroupService.getGroup('groupName', group.groupName);

    expect(foundGroup.groupName).toBe(group.groupName);
    expect(foundGroup.groupTitle).toBe(group.groupTitle);
  });

  test("Trying to find an unexisting record of the group", async () => {
    const foundGroup = await GroupService.getGroup('groupName', 'foo');

    expect(foundGroup).toBe(null);
  });

  test("Checking pagination in methid getGroups", async () => {
    await createCorrectTestGroup();
    const secTestGroup = await createAlterCorrectTestGroup();
    let foundGroup = await GroupService.getGroups(undefined, 2, 1);

    foundGroup = foundGroup.rows.map(group => String(group._id));

    expect(foundGroup).toEqual([String(secTestGroup.group._id)]);
  });

  test("Checking filteringin methid getGroups", async () => {
    await createCorrectTestGroup();
    const secTestGroup = await createAlterCorrectTestGroup();
    let foundGroup = await GroupService.getGroups('{"groupTitle":"-alter"}');

    foundGroup = foundGroup.rows.map(group => String(group._id));

    expect(foundGroup).toEqual([String(secTestGroup.group._id)]);
  });
});

describe("Group service: group deleting", () => {
  test("Trying to delete an existing group", async () => {
    const { group } = await createCorrectTestGroup()
    const deletedGroup = await GroupService.deleteGroup(group._id);

    expect(deletedGroup.message).toBe("Group deleted succesfully");
    expect(deletedGroup.group.groupName).toBe(group.groupName);
  });

  test("Trying to delete an unexisting group using incorrect id", async () => {
    await expect(GroupService.deleteGroup("boo")).rejects.toThrow("Incorrect group's id");
  });

  test("Trying to delete an unexisting group using correct id", async () => {
    await expect(GroupService.deleteGroup("6245718f0e677453a6312f93")).rejects.toThrow("Group you try to delete doesn't exists");
  });
});

describe("Group service: group editing", () => {
  test("Trying to edit an existing group with correct params", async () => {
    const { group } = await createCorrectTestGroup();

    await GroupService.editGroup(group._id, alterCorrectGroupObj.groupName, alterCorrectGroupObj.groupTitle);
    const editedGroup = await GroupService.getGroup('_id', group._id);

    expect(editedGroup.groupName).toBe(alterCorrectGroupObj.groupName);
    expect(editedGroup.groupTitle).toBe(alterCorrectGroupObj.groupTitle);
  });

  test("Trying to edit an existing group by setting ununique group-name", async () => {
    const { group } = await createCorrectTestGroup();

    await createAlterCorrectTestGroup();

    await expect(GroupService.editGroup(group._id, alterCorrectGroupObj.groupName))
      .rejects.toThrow("groupName for groups must be unique");
  });

  test("Trying to edit an unexisting group using incorrect id", async () => {
    await expect(GroupService.editGroup('foo', "Fifth-group"))
      .rejects.toThrow("Incorrect group's id");
  });

  test("Trying to edit an unexisting group using correct id", async () => {
    await expect(GroupService.editGroup('624581d8abeb4d8cbbb43c6d', "Fifth-group"))
      .rejects.toThrow("Group you try to edit doesn't exists");
  });
});