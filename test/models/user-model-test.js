import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { testPoiCinema, testUserJohn, testUsers } from "../fixtures.js";

import { db } from "../../src/models/db.js";

suite("User model tests", () => {
  setup(async () => {
    db.init("testMongo");
    await db.userStore.deleteAll();
    for (let i = 0; i < testUsers.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.userStore.addUser(testUsers[i]);
    }
  });

  // creating the user
  test("create a user", async () => {
    const newUser = await db.userStore.addUser(testUserJohn);
    assertSubset(testUserJohn, newUser);
  });

  // get user by id
  test("get  user by id, successful", async () => {
    const testUser = await db.userStore.addUser(testUserJohn);
    const returnedUser = await db.userStore.getUserById(testUser._id);
    assert.deepEqual(testUser, returnedUser);
  });

  // get user by id, unssuccesful
  test("get  user by id, unsuccesfull", async () => {
    let returnedUser = await db.userStore.getUserById("");
    assert.isNull(returnedUser);
    returnedUser = await db.userStore.getUserById();
    assert.isNull(returnedUser);
  });
  // get user by email, successful
  test("get a user by email,successful", async () => {
    const testUser = await db.userStore.addUser(testUserJohn);
    const returnedUser = await db.userStore.getUserByEmail(testUser.email);
    assert.deepEqual(testUser, returnedUser);
  });

  // get user by email,unsuccessful
  test("get a user by email, unsuccessful", async () => {
    let returnedUser = await db.userStore.getUserByEmail("");
    assert.isNull(returnedUser);
    returnedUser = await db.userStore.getUserByEmail();
    assert.isNull(returnedUser);
  });
  // deleteAll
  test("delete all users", async () => {
    let returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await db.userStore.deleteAll();
    returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 0);
  });
  // delete user byId - one user
  test("delete user by id one", async () => {
    const testUser = await db.userStore.addUser(testUserJohn);
    let returnedUser = await db.userStore.getAllUsers();
    assert.equal(returnedUser.length, 4);
    await db.userStore.deleteUserById(testUser._id);
    returnedUser = await db.userStore.getAllUsers();
    assert.equal(returnedUser.length, 3);
    const deleteUser = await db.userStore.getUserById(testUser._id);
    assert.isNull(deleteUser);
  });

  // delete user, unsuccessful
  test("delete user by id, unsuccessfull", async () => {
    await db.userStore.deleteUserById("wrong");
    const returnedUser = await db.userStore.getAllUsers();
    assert.equal(returnedUser.length, 3);
  });

  // delete userById - from many
  test("delete one user by id many", async () => {
    let returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 3);
    await db.userStore.deleteUserById(returnedUsers[0]._id);
    returnedUsers = await db.userStore.getAllUsers();
    assert.equal(returnedUsers.length, 2);
  });

  // updatePoi
  test("update user", async () => {
    const testUser = await db.userStore.addUser(testUserJohn);
    await db.userStore.updateUser(testUser._id, { name: "changed" });
    testUser.name = "changed";
    const returnedUser = await db.userStore.getUserById(testUser._id);
    assertSubset(testUser, returnedUser);
  });

  // update poi, wrong
  test("update user, unsuccessful", async () => {
    // eslint-disable-next-line camelcase
    const returnedUser = await db.userStore.updateUser("", { name: "changed" });
    assert.isNull(returnedUser);
  });
});
