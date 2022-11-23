const router = require('express').Router();
const {
    getAllGords, 
    getSingleGord
} = require('../controllers/gordController')

const {
    getAllVotes, 
    createVote
} = require('../controllers/voteController')

router.route('/').get(getAllGords).get(getSingleGord);
router.route('/').get(getAllVotes).post(createVote);

module.exports = router;

