const userService = require("./userService");
const GetMongoMemoryServer = require("../db/testDb");
const { expandMongooseMethods } = require('../db/index');
const UserService = require("./userService");

const correctUserObj = {
  username: "AndrewTheFirst",
  firstName: "Andrew",
  lastName: "Makarevich",
  email: "andrei1@mail.ru"
}
const alterCorrectUserObj = {
  username: "AndrewTheSecond",
  firstName: "Andrew",
  lastName: "Makarevich",
  email: "andrei2@mail.ru"
}

const incorrectUserObj = {
  username: "a",
  firstName: "AndrewLalalalalalaalalala",
  lastName: "Makarevich",
  email: "andrei1@mail@.ru"
}

expandMongooseMethods();

let server;

beforeAll(async () => {
  server = await GetMongoMemoryServer();
  server.connect();
});

afterEach(async () => {
  await server.cleanDataBase();
});

afterAll(async () => {
  await server.disconnect();
});

describe("User service: user creating", () => {
  test("Correct user creating", async () => {
    const { username, firstName, lastName, email } = correctUserObj;
    const testUser = await userService.createUser(username, firstName, lastName, email);
    const createdUser = await userService.getUser("username", username);

    expect(testUser.message).toBe("User created successfully");
    expect(createdUser.username).toBe(username);
  });

  test("Trying to create user with incorrect params", async () => {
    const { username, firstName, lastName, email } = incorrectUserObj;
    const testUser = async () => await userService.createUser(username, firstName, lastName, email);

    await expect(testUser())
      .rejects
      .toThrow(`User validation failed: username: Username does't match required pattern, firstName: First name is too long, email: Path \`email\` is invalid (${email}).`);
  });

  test("Trying to create user with ununique username", async () => {
    const { username, firstName, lastName, email } = correctUserObj;

    await userService.createUser(username, firstName, lastName, email);
    const testUser = async () => await userService.createUser(username, firstName, lastName, email);

    await expect(testUser())
      .rejects
      .toThrow("username for users must be unique");
  });

  test("Trying to create user with ununique email", async () => {
    const { username, firstName, lastName, email } = correctUserObj;

    await userService.createUser(username, firstName, lastName, email)
    const testUser = async () => await userService.createUser("AndrewTheSecond", firstName, lastName, email);

    await expect(testUser())
      .rejects
      .toThrow("email for users must be unique");
  });
});

describe("User service: user searching", () => {
  test("Trying to find an existing record of the user", async () => {
    const { username, firstName, lastName, email } = correctUserObj;

    await UserService.createUser(username, firstName, lastName, email);
    const foundUser = await UserService.getUser("username", username);

    expect(foundUser.username).toBe(username);
    expect(foundUser.email).toBe(email);
  });

  test("Trying to find an unexisting record of the user", async () => {
    const { username, firstName, lastName, email } = correctUserObj;

    await UserService.createUser(username, firstName, lastName, email);
    const foundUser = await UserService.getUser("username", "foo");

    expect(foundUser).toBe(null);
  });

  test("Checking pagination in method getUsers", async () => {
    const users = await createPairOfUsersForTest();
    const thirdUser = await UserService.createUser("AndrewTheThird", "Andrew", "Makarevich", "andrew3@mail.ru");
    let userListResult = await UserService.getUsers(undefined, 2, 1);

    // Processing result array, to change query result objects to their id's
    // userListResult = userListResult.map(result => String(result._id));
    // expect(userListResult).toMatchObject([String(users.secondUser.user[0]._id)]);
    expect(userListResult).toMatchObject([alterCorrectUserObj]);
  });

  test("Checking filtering in method getUsers", async () => {
    const users = await createPairOfUsersForTest();
    const thirdUser = await UserService.createUser("AndrewTheThird", "Andrew", "Makarevich", "andrew3@mail.ru");
    let userListResult = await UserService.getUsers('{"email":"andrew"}', undefined, undefined);

    // Processing result array, to change query result objects to their id's
    userListResult = userListResult.map(result => String(result._id));

    expect(userListResult).toEqual([String(thirdUser.user[0]._id)]);
  });
});

describe("User service: user deleting", () => {
  test("Trying to delete an existing user", async () => {
    const { username, firstName, lastName, email } = correctUserObj;
    const createdUser = await UserService.createUser(username, firstName, lastName, email);
    const deletedUser = await UserService.deleteUser(createdUser.user[0].id);

    expect(deletedUser.message).toBe("User deleted successfully");
    expect(deletedUser.user.username).toBe(username);
  });

  test("Trying to delete an unexisting user with incorrect user's id", async () => {
    const userDelete = async () => await UserService.deleteUser("fooboo");

    await expect(userDelete()).rejects.toThrow("Incorrect user's id");
  });

  test("Trying to delete an unexisting user with correct user's id", async () => {
    const userDelete = async () => await UserService.deleteUser("6242f34aa787da293c733ef8");

    await expect(userDelete()).rejects.toThrow("User you try to delete doesn't exists");
  });


});

describe("User service: user editing", () => {
  test("Trying to edit an existing user with correct params", async () => {
    const { username, firstName, lastName, email } = correctUserObj;
    const createdUser = await UserService.createUser(username, firstName, lastName, email);

    await UserService.editUser(createdUser.user[0].id, "AndrewTheSecond", "Andrei");
    const editedUser = await UserService.getUser("_id", createdUser.user[0].id);

    expect(editedUser.username).toBe("AndrewTheSecond");
    expect(editedUser.firstName).toBe("Andrei");
  });

  test("Trying to edit an existing user with ununique username param", async () => {
    const users = await createPairOfUsersForTest();

    const editUserIncorrectly = async () => {
      await UserService.editUser(users.secondUser.user[0].id, users.firstUser.user[0].username)
    };

    await expect(editUserIncorrectly()).rejects.toThrow("username for users must be unique");
  });

  test("Trying to edit an existing user with ununique email param", async () => {
    const users = await createPairOfUsersForTest();

    const editUserIncorrectly = async () => {
      await UserService.editUser(users.secondUser.user[0].id, undefined, undefined, undefined, users.firstUser.user[0].email)
    };

    await expect(editUserIncorrectly()).rejects.toThrow("email for users must be unique");
  });

  test("Trying to edit an unexisting group with incorrect user's id", async () => {
    await expect(UserService.editUser("foo")).rejects.toThrow("Incorrect user's id")
  });

  test("Trying to edit an unexisting group with correct user's id", async () => {
    await expect(UserService.editUser("6242f34aa787da293c733ef8")).rejects.toThrow("User you try to edit doesn't exists")
  });
});


// Function that creates pair of users, wich can be used for the test
async function createPairOfUsersForTest() {
  const { username, firstName, lastName, email } = correctUserObj;
  const {
    username: alterUsername,
    firstName: alterFirstName,
    lastName: alterLastName,
    email: AlterEmail } = alterCorrectUserObj;

  const firstUser = await UserService.createUser(username, firstName, lastName, email);
  const secondUser = await UserService.createUser(alterUsername, alterFirstName, alterLastName, AlterEmail);

  return {
    firstUser,
    secondUser
  }
}