import { assert } from "chai";
import { poiService } from "./poi-service.js";
import { decodeToken } from "../../src/api/jwt-utils.js";
import { testUserJohn, johnCredentials } from "../fixtures.js";

suite("Authentication API tests", async () => {
  setup(async () => {
    poiService.clearAuth();
    await poiService.addUser(testUserJohn);
    await poiService.authenticate(testUserJohn);
    await poiService.deleteAllUsers();
  });

  test("authenticate", async () => {
    const user = await poiService.addUser(testUserJohn);
    const response = await poiService.authenticate(testUserJohn);
    assert(response.success);
    assert.isDefined(response.token);
  });

  test("verify token", async () => {
    const userAdded = await poiService.addUser(testUserJohn);
    const response = await poiService.authenticate(johnCredentials);

    // compare user values with values from token
    const userToken = decodeToken(response.token);
    assert.equal(userToken.email, userAdded.email);
    assert.equal(userToken.userId, userAdded._id);
  });

  test("check Unauthorized", async () => {
    poiService.clearAuth();
    try {
      await poiService.deleteAllUsers();
      assert.fail("Route not protected");
    } catch (error) {
      assert.equal(error.response.data.statusCode, 401);
    }
  });
});
