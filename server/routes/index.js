const router = require("express").Router();
const path = require("path");

const {
  getAllGords,
  getSingleGord,
  createVote,
  getAllVotes,
} = require("../controllers/gordController");

router.route("/api/gords").get(getAllGords).post(createVote);
router.route("/api/gords/:id").get(getSingleGord);

router.route("/api/tally").get(getAllVotes);

router.use((req, res) => {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
