const db = require("../config/connection");
const { Gord } = require("../models");

const gordData = require("./gordData.json");

db.once("open", async () => {
  await Gord.deleteMany({});
  await Gord.collection.insertMany(gordData);

  console.log("all done!");
  console.table(gordData);
  process.exit(0);
});