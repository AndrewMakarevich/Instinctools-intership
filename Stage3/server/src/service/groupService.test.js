// import GroupService from "";
import GroupService from './groupService.js'

describe("GroupService: creating group", () => {
  beforeEach(() => {
    jest.setTimeout(60000);
  });
  test("Correct group's data", async () => {
    const creatingGroupResponse = await GroupService.createGroup("Fourth-group", "Test-group");
    expect(creatingGroupResponse).toEqual({ message: `Group Fourth-group created successfully` });

  });
});
