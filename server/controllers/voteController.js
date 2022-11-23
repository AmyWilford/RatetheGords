const { Gord, Vote } = require("../models");

module.exports = {
  // get total number of votes
//   getAllVotes(req, res) {
//     Vote.find().count
//       .then((votes) => res.json(votes))
//       .catch((err) => res.status(500).json(err));
//   },

  // create a new Vote - update the corresponding gord's score - how to update with corresponding Gord.
  createVote(req, res) {
    Vote.create(req.body)
      .then((vote) => {
        return Gord.findOneAndUpdate(
          { _id: req.body.gordId },
          { $addToSet: { votes: vote._id } },
          { new: true }
        );
      })
      .then((gord) =>
        !gord
          ? res
              .status(404)
              .json({
                message: "We added your vote - but your gord does not exist",
              })
          : res.json("vote added")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
