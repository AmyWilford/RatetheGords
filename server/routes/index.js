const router = require('express').Router();
const path = require('path');

const {
  getAllGords,
  getSingleGord,
  createVote,
} = require('../controllers/gordController');

router.route('/api/gords').get(getAllGords).post(createVote);

router.route('/:gordId').get(getSingleGord);
// router.route('/').get(getAllVotes).post(createVote);

// router.use((req, res) => {
//     res.sendFile(path.join(dirname, '../../client/build/index.html'));
//   });

router.use((req, res) => {
  res.sendFile(path.join(dirname, '../../client/build/index.html'));
});

module.exports = router;