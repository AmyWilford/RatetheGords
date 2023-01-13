const router = require("express").Router();
const path = require("path");

const {
  getAllGords,
  getSingleGord,
  createVote,
  getAllVotes,
} = require("../controllers/gordController");

router.route("/api/gords").get(getAllGords).post(createVote);
router.route("/api/gords/:gordId").get(getSingleGord);
// router.route('/').post(createVote);

// router.use((req, res) => {
//     res.sendFile(path.join(dirname, '../../client/build/index.html'));
//   });

router.use((req, res) => {
  res.sendFile(path.join(dirname, "../../client/build/index.html"));
});

module.exports = router;
