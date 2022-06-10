import { assert } from "chai";
import { assertSubset } from "./test-utils.js";
import { testPoiCinema, testPois, testUsers } from "./fixtures.js";

import { db } from "../src/models/db.js";

suite("Poi Unit Test", async () => {
  setup(async () => {
    db.init("mongo");
    await db.poiStore.deleteAllPoi();
  });

  // get all poi
  test("get all pois ", async () => {
    for (let i = 0; i < testPois.length; ++i) {
      // eslint-disable-next-line no-await-in-loop
      await db.poiStore.addPoi(testPois[i]);
    }
    const returnedPoi = await db.poiStore.getAllPois();
    assert.equal(returnedPoi.length, 3);
  });
  // addPoi
  test("get poi by id ", async () => {
    const testPoi = await db.poiStore.addPoi(testPoiCinema);
    assertSubset(testPoi, testPoiCinema);
  });
  // get poi by id
  test("get poi by id ", async () => {
    const testPoi = await db.poiStore.addPoi(testPoiCinema);
    const newPoi = await db.poiStore.getPoiById(testPoi._);
    assertSubset(testPoi, newPoi);
  });

  // getUsersPoi

  // deletePoi
  test("delete poi", async () => {
    const testPoi = await db.poiStore.addPoi(testPoiCinema);
    await db.poiStore.deletePoi(testPoi._id);
    const deletedPoi = await db.poiStore.getPoiById(testPoi._id);
    assert.isNull(deletedPoi);
  });
  // updatePoi

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
