const GetMongoMemoryServer = require("../db/testDb");
const GroupService = require("./groupService");

jest.setTimeout(30000);

let server;

beforeAll(async () => {
  server = await GetMongoMemoryServer();
  await server.connect();
});

afterEach(async () => {
  await server.clearDataBase();
});

afterAll(async () => {
  await server.disconnect();
});

describe("Group service: creating group test", () => {


  test("Correct group creating", async () => {
    try {
      const groupName = "Fourth-group";
      const response = await GroupService.createGroup(groupName, "Test-group");

      expect(response).toEqual({ message: `Group ${groupName} created successfully` });
    } catch (e) {
      console.log('ERROR', e);
    }
  });

});
