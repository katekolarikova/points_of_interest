import { assert } from "chai";
import { poiService } from "./poi-service.js";
import { assertSubset } from "../test-utils.js";
import { testPoiCinema, testPois, testUsers, testUserJohn, johnCredentials } from "../fixtures.js";

const pois = new Array(testPois.length);

suite("Poi API tests", () => {
  setup(async () => {
    poiService.clearAuth();
    let user = await poiService.addUser(testUserJohn);
    await poiService.authenticate(johnCredentials);
    await poiService.deleteAllPois();
    for (let i = 0; i < testPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      pois[0] = await poiService.addPoi(testPois[i]);
    }
    await poiService.deleteAllUsers();
    user = await poiService.addUser(testUserJohn);
    await poiService.authenticate(johnCredentials);
    testPoiCinema.userid = user._id;
  });
  teardown(async () => {});

  test("create a poi", async () => {
    const newPoi = await poiService.addPoi(testPoiCinema);
    assertSubset(testPoiCinema, newPoi);
    assert.isDefined(newPoi._id);
  });

  test("delete all pois", async () => {
    let returnedPois = await poiService.getAllPois();
    assert.equal(returnedPois.length, 3);
    await poiService.deleteAllPois();
    returnedPois = await poiService.getAllPois();
    assert.equal(returnedPois.length, 0);
  });

  test("get a poi - success", async () => {
    const returnedPoi = await poiService.getPoi(pois[0]._id);
    assert.deepEqual(pois[0], returnedPoi);
  });
  // get all
  test("get all pois", async () => {
    const returnedPois = await poiService.getAllPois();
    assert.equal(returnedPois.length, 3);
  });
  // delete one
  test("delete a poi", async () => {
    const returnedPoi = await poiService.getPoi(pois[0]._id);
    await poiService.deleteOnePoi(returnedPoi._id);
    const allPois = await poiService.getAllPois();
    assert.equal(allPois.length, testPois.length - 1);
  });

  test("delete poi, unsuccessful", async () => {
    try {
      const response = await poiService.deleteOnePoi("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Poi with this id", "Incorrect Response Message");
    }
  });

  test("get poi, unsuccessful", async () => {
    try {
      const response = await poiService.getPoi("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Poi with this id", "Incorrect Response Message");
    }
  });
});
