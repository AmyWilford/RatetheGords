const router = require('express').Router();
// const gordRoutes = require('./gordRoutes');
// router.use('/gordRoutes')

const {
    getAllGords, 
    getSingleGord
} = require('../controllers/gordController')

const {
    // getAllVotes, 
    createVote
} = require('../controllers/voteController')

router.route('/').get(getAllGords)

router.route('/:gordId').get(getSingleGord).post(createVote)
// router.route('/').get(getAllVotes).post(createVote);

// router.use((req, res) => {
//     res.sendFile(path.join(__dirname, '../../client/build/index.html'));
//   });
  
  module.exports = router;
  