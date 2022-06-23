import { assert } from "chai";
import { poiService } from "./poi-service.js";
import { assertSubset } from "../test-utils.js";
import { testUserJohn, testUsers, johnCredentials } from "../fixtures.js";
import { userApi } from "../../src/api/users-api.js";

const users = new Array(testUsers.length);

suite("User API tests", () => {
  setup(async () => {
    poiService.clearAuth();
    let user = await poiService.addUser(testUserJohn);
    await poiService.authenticate(johnCredentials);
    await poiService.deleteAllUsers();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      users[0] = await poiService.addUser(testUsers[i]);
    }
    user = await poiService.addUser(testUserJohn);
    await poiService.authenticate(johnCredentials);
  });
  teardown(async () => {});

  test("create a user", async () => {
    const newUser = await poiService.addUser(testUserJohn);
    assertSubset(testUserJohn, newUser);
    assert.isDefined(newUser._id);
  });

  test("delete all users", async () => {
    let returnedUsers = await poiService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
    await poiService.deleteAllUsers();
    await poiService.addUser(testUserJohn);
    await poiService.authenticate(johnCredentials);
    returnedUsers = await poiService.getAllUsers();
    assert.equal(returnedUsers.length, 1);
  });

  test("get a user - success", async () => {
    const returnedUser = await poiService.getUser(users[0]._id);
    assert.deepEqual(users[0], returnedUser);
  });
  // get all
  test("get all users", async () => {
    const returnedUsers = await poiService.getAllUsers();
    assert.equal(returnedUsers.length, 4);
  });

  // delete one
  test("delete a user", async () => {
    let allUser = await poiService.getAllUsers();
    const returnedUser = await poiService.getUser(users[0]._id);
    await poiService.deleteOneUser(returnedUser._id);
    allUser = await poiService.getAllUsers();
    assert.equal(allUser.length, testUsers.length - 1 + 1);
  });

  test("delete user, unsuccessful", async () => {
    try {
      const response = await poiService.deleteOneUser("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      console.log(error.response);
      assert(error.response.data.message === "No User with this id", "Incorrect Response Message");
    }
  });

  test("get user, unsuccessful", async () => {
    try {
      const response = await poiService.getUser("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No User with this id", "Incorrect Response Message");
      assert.equal(error.response.data.statusCode, 503);
    }
  });
});
