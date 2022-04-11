const GetMongoMemoryServer = require('../db/testDb');
const { expandMongooseMethods } = require('../db/index');
const UserService = require('./userService');
const {
  correctUserObj,
  alterCorrectUserObj,
  incorrectUserObj,
} = require('./consts.mock');

expandMongooseMethods();

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

async function createCorrectTestUser(ownUsername, ownEmail) {
  const { username, firstName, lastName, email } = correctUserObj;
  const testUser = await UserService.createUser(
    ownUsername || username,
    firstName,
    lastName,
    ownEmail || email
  );

  return {
    user: testUser.user[0],
    message: testUser.message,
  };
}

async function createAlterCorrectTestUser(ownUsername, ownEmail) {
  const { username, firstName, lastName, email } = alterCorrectUserObj;
  const testUser = await UserService.createUser(
    ownUsername || username,
    firstName,
    lastName,
    ownEmail || email
  );

  return {
    user: testUser.user[0],
    message: testUser.message,
  };
}

async function createIncorrectTestUser() {
  const { username, firstName, lastName, email } = incorrectUserObj;
  const testUser = await UserService.createUser(
    username,
    firstName,
    lastName,
    email
  );

  return {
    user: testUser.user[0],
    message: testUser.message,
  };
}

describe('User service: user creating', () => {
  test('Correct user creating', async () => {
    const testUser = await createCorrectTestUser();
    const createdUser = await UserService.getUser(
      'username',
      testUser.user.username
    );

    expect(testUser.message).toBe('User created successfully');
    expect(createdUser.username).toBe(testUser.user.username);
  });

  test('Trying to create user with incorrect params', async () => {
    await expect(createIncorrectTestUser()).rejects.toThrow(
      `User validation failed: username: Username does't match required pattern, firstName: First name is too long, email: Path \`email\` is invalid (${incorrectUserObj.email}).`
    );
  });

  test('Trying to create user with ununique username', async () => {
    await createCorrectTestUser();
    await expect(createCorrectTestUser()).rejects.toThrow(
      'username for users must be unique'
    );
  });

  test('Trying to create user with ununique email', async () => {
    await createCorrectTestUser();

    await expect(createCorrectTestUser('AndrewTheSecond')).rejects.toThrow(
      'email for users must be unique'
    );
  });
});

describe('User service: user searching', () => {
  test('Trying to find an existing record of the user', async () => {
    const { user } = await createCorrectTestUser();
    const foundUser = await UserService.getUser('username', user.username);

    expect(foundUser.username).toBe(user.username);
    expect(foundUser.email).toBe(user.email);
  });

  test('Trying to find an unexisting record of the user', async () => {
    await createAlterCorrectTestUser();

    const foundUser = await UserService.getUser('username', 'foo');

    expect(foundUser).toBe(null);
  });

  test('Checking pagination in method getUsers', async () => {
    await createCorrectTestUser();
    await createAlterCorrectTestUser();
    await createCorrectTestUser('AndrewTheThird', 'andrew3@mail.ru');
    const userListResult = await UserService.getUsers(undefined, 2, 1);

    // Processing result array, to change query result objects to their id's
    // userListResult = userListResult.map(result => String(result._id));
    // expect(userListResult).toEqual([String(users.secondUser.user[0]._id)]);
    expect(userListResult.rows).toMatchObject([alterCorrectUserObj]);
  });

  test('Checking filtering in method getUsers', async () => {
    await createCorrectTestUser();
    await createAlterCorrectTestUser();
    const { user: thirdUser } = await createCorrectTestUser(
      'AndrewTheThird',
      'andrew3@mail.ru'
    );
    let userListResult = await UserService.getUsers(
      '{"email":"andrew"}',
      undefined,
      undefined
    );

    // Processing result array, to change query result objects to their id's
    userListResult = userListResult.rows.map((result) => String(result._id));

    expect(userListResult).toEqual([String(thirdUser._id)]);
  });
});

describe('User service: user deleting', () => {
  test('Trying to delete an existing user', async () => {
    const { user: createdUser } = await createCorrectTestUser();
    const deletedUser = await UserService.deleteUser(createdUser.id);

    expect(deletedUser.message).toBe('User deleted successfully');
    expect(deletedUser.user.username).toBe(createdUser.username);
  });

  test("Trying to delete an unexisting user with incorrect user's id", async () => {
    const userDelete = async () => {
      await UserService.deleteUser('fooboo');
    };

    await expect(userDelete()).rejects.toThrow("Incorrect user's id");
  });

  test("Trying to delete an unexisting user with correct user's id", async () => {
    const userDelete = async () => {
      await UserService.deleteUser('6242f34aa787da293c733ef8');
    };

    await expect(userDelete()).rejects.toThrow(
      "User you try to delete doesn't exists"
    );
  });
});

describe('User service: user editing', () => {
  test('Trying to edit an existing user with correct params', async () => {
    const { user: createdUser } = await createCorrectTestUser();

    await UserService.editUser(createdUser.id, 'AndrewTheSecond', 'Andrei');
    const editedUser = await UserService.getUser('_id', createdUser.id);

    expect(editedUser.username).toBe('AndrewTheSecond');
    expect(editedUser.firstName).toBe('Andrei');
  });

  test('Trying to edit an existing user with ununique username param', async () => {
    const { user: firstUser } = await createCorrectTestUser();
    const { user: secondUser } = await createAlterCorrectTestUser();

    const editUserIncorrectly = async () => {
      await UserService.editUser(secondUser._id, firstUser.username);
    };

    await expect(editUserIncorrectly()).rejects.toThrow(
      'username for users must be unique'
    );
  });

  test('Trying to edit an existing user with ununique email param', async () => {
    const { user: firstUser } = await createCorrectTestUser();
    const { user: secondUser } = await createAlterCorrectTestUser();

    const editUserIncorrectly = async () => {
      await UserService.editUser(
        secondUser._id,
        undefined,
        undefined,
        undefined,
        firstUser.email
      );
    };

    await expect(editUserIncorrectly()).rejects.toThrow(
      'email for users must be unique'
    );
  });

  test("Trying to edit an unexisting group with incorrect user's id", async () => {
    await expect(UserService.editUser('foo')).rejects.toThrow(
      "Incorrect user's id"
    );
  });

  test("Trying to edit an unexisting group with correct user's id", async () => {
    await expect(
      UserService.editUser('6242f34aa787da293c733ef8')
    ).rejects.toThrow("User you try to edit doesn't exists");
  });
});
