const GetMongoMemoryServer = require("../db/testDb");
const GroupService = require("./groupService");
const { expandMongooseMethods } = require('../db/index');

const correctGroupObj = {
  groupName: "Fourth-group",
  groupTitle: "Test-group"
};

const incorrectGroupObj = {
  groupName: "aa",
  groupTitle: "a"
};

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

describe("Group service: group creating", () => {

  test("Correct group creating", async () => {
    const { groupName, groupTitle } = correctGroupObj;
    const response = await GroupService.createGroup(groupName, groupTitle);
    const createdGroup = await GroupService.getGroup('_id', response.group[0]._id);

    expect(response.message).toBe(`Group ${groupName} created successfully`);
    expect(createdGroup.groupName).toBe(`${groupName}`);
    expect(createdGroup.groupTitle).toBe(`${groupTitle}`);
  });

  test("Trying to create a group with incorrect params", async () => {
    const { groupName, groupTitle } = incorrectGroupObj;

    await expect(GroupService.createGroup(groupName, groupTitle))
      .rejects.toThrow("Group validation failed: groupName: Group's name doesn't match required pattern, groupTitle: Group's title doesn't match required pattern");
  });

  test("Trying to create a group with ununique group-name", async () => {
    const { groupName, groupTitle } = correctGroupObj;

    await GroupService.createGroup(groupName, groupTitle);
    await expect(GroupService.createGroup(groupName, groupTitle)).rejects.toThrow("groupName for groups must be unique");
  });
});

describe("Group service: group searching", () => {
  test("Trying to find an existing record of the group", async () => {
    const { groupName, groupTitle } = correctGroupObj;

    await GroupService.createGroup(groupName, groupTitle);
    const foundGroup = await GroupService.getGroup('groupName', groupName);

    expect(foundGroup.groupName).toBe(groupName);
    expect(foundGroup.groupTitle).toBe(groupTitle);
  });

  test("Trying to find an unexisting record of the group", async () => {
    const foundGroup = await GroupService.getGroup('groupName', 'foo');

    expect(foundGroup).toBe(null);
  });
});

describe("Group service: group deleting", () => {
  test("Trying to delete an existing group", async () => {
    const { groupName, groupTitle } = correctGroupObj;

    const createdGroup = await GroupService.createGroup(groupName, groupTitle);
    const deletedGroup = await GroupService.deleteGroup(createdGroup.group[0]._id);

    expect(deletedGroup.message).toBe("Group deleted succesfully");
    expect(deletedGroup.group.groupName).toBe(groupName);
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
    const { groupName, groupTitle } = correctGroupObj;
    const { group } = await GroupService.createGroup(groupName, groupTitle);

    await GroupService.editGroup(group[0]._id, "Fifth-group", "Test-group-edit");
    const editedGroup = await GroupService.getGroup('_id', group[0]._id);

    expect(editedGroup.groupName).toBe("Fifth-group");
    expect(editedGroup.groupTitle).toBe("Test-group-edit");
  });

  test("Trying to edit an existing group by setting ununique group-name", async () => {
    const { groupName, groupTitle } = correctGroupObj;
    const { group } = await GroupService.createGroup(groupName, groupTitle);

    await GroupService.createGroup("Fifth-group", "Test-group");

    await expect(GroupService.editGroup(group[0]._id, "Fifth-group"))
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