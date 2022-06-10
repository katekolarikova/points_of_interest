import { assert } from "chai";
import { assertSubset } from "./test-utils.js";
import { testUserJohn, testUsers } from "./fixtures.js";

import { db } from "../src/models/db.js";

suite("User API tests", () => {
  setup(async () => {
    db.init("mongo");
    await db.userStore.deleteAll();
  });

  // creating the user
  test("create a user", async () => {
    const newUser = await db.userStore.addUser(testUserJohn);
    assertSubset(testUserJohn, newUser);
  });

  // get user by id
  test("get  user by id - success", async () => {
    const testUser = await db.userStore.addUser(testUserJohn);
    const returnedUser = await db.userStore.getUserById(testUser._id);
    assert.deepEqual(testUser, returnedUser);
  });
  // get user by email
  test("get a user by email - success", async () => {
    const testUser = await db.userStore.addUser(testUserJohn);
    const returnedUser = await db.userStore.getUserByEmail(testUser.email);
    assert.deepEqual(testUser, returnedUser);
  });
  // deleteAll
  test("delete all users", async () => {
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.userStore.addUser(testUsers[i]);
    }
    let returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await db.userStore.deleteAll();
    returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });
  // delete user byId - one user
  test("delete user by id one", async () => {
    const testUser = await db.userStore.addUser(testUserJohn);
    await db.userStore.deleteUserById(testUser._id);
    const deleteUser = await db.userStore.getUserById(testUser._id);
    assert.isNull(deleteUser);
  });

  // delete userById - from many
  test("delete one user by id many", async () => {
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.userStore.addUser(testUsers[i]);
    }
    let returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await db.userStore.deleteUserById(returnedUsers[0]._id);
    returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 2);
  });
});
