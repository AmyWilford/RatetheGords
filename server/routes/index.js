const router = require("express").Router();
// const gordRoutes = require('./gordRoutes');
// router.use('/gordRoutes')

const {
  getAllGords,
  getSingleGord,
  createVote,
} = require("../controllers/gordController");

// const {
//     // getAllVotes,
//     createVote
// } = require('../controllers/voteController')

router.route("/").get(getAllGords);

router.route("/:gordId").post(createVote).get(getSingleGord);
// router.route('/').get(getAllVotes).post(createVote);

// router.use((req, res) => {
//     res.sendFile(path.join(__dirname, '../../client/build/index.html'));
//   });

module.exports = router;
