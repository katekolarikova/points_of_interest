import { assert } from "chai";
import { assertSubset } from "../test-utils.js";
import { testPoiCinema, testPois, testUsers } from "../fixtures.js";

import { db } from "../../src/models/db.js";

suite("Poi Unit Test", async () => {
  setup(async () => {
    db.init("testMongo");
    await db.poiStore.deleteAllPoi();
  });

  // get all poi
  test("get all pois ", async () => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < testPois.length; ++i) {
      // eslint-disable-next-line no-await-in-loop
      await db.poiStore.addPoi(testPois[i]);
    }
    const returnedPois = await db.poiStore.getAllPois();
    assert.equal(returnedPois.length, 3);
  });
  // addPoi
  test("add poi", async () => {
    const testPoi = await db.poiStore.addPoi(testPoiCinema);
    assertSubset(testPoi, testPoiCinema);
  });

  // updatePoi
  test("update poi", async () => {
    const testPoi = await db.poiStore.addPoi(testPoiCinema);
    await db.poiStore.updatePoi(testPoi._id, { name: "changed" });
    testPoi.name = "changed";
    const returnedPoi = await db.poiStore.getPoiById(testPoi._id);
    assertSubset(testPoi, returnedPoi);
  });

  // get poi by id, successful
  test("get poi by id, successfull ", async () => {
    const testPoi = await db.poiStore.addPoi(testPoiCinema);
    const newPoi = await db.poiStore.getPoiById(testPoi._id);
    assertSubset(testPoi, newPoi);
  });

  // get poi by id, unsuccessful
  test("get poi by id, unseccessful ", async () => {
    const newPoi = await db.poiStore.getPoiById("");
    assert.isNull(newPoi);
  });

  // deletePoi, successful
  test("delete poi, successful", async () => {
    const testPoi = await db.poiStore.addPoi(testPoiCinema);
    let returnedPois = await db.poiStore.getAllPois();
    assert.equal(returnedPois.length, 1);
    await db.poiStore.deletePoi(testPoi._id);
    returnedPois = await db.poiStore.getAllPois();
    assert.equal(returnedPois.length, 0);
    const deletedPoi = await db.poiStore.getPoiById(testPoi._id);
    assert.isNull(deletedPoi);
  });

  // deletePoi wrong parameters
  test("delete poi, unsuccessful", async () => {
    for (let i = 0; i < testPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.poiStore.addPoi(testPois[i]);
    }
    await db.poiStore.deletePoi("xx");
    const returnedPois = await db.poiStore.getAllPois();
    assert.equal(testPois.length, returnedPois.length);
  });

  // deleteAll
  test("delete all pois", async () => {
    for (let i = 0; i < testPois.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await db.poiStore.addPoi(testPois[i]);
    }
    let returnedPois = await db.poiStore.getAllPois();
    assert.equal(returnedPois.length, 3);
    await db.poiStore.deleteAllPoi();
    returnedPois = await db.poiStore.getAllPois();
    assert.equal(returnedPois.length, 0);
  });
});
