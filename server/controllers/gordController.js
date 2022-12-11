// const { ObjectId } = require("mongoose").Types;
const { Gord } = require("../models");

// const totalGordVotes = (gordId) =>
//   Gord.aggregate([
//     { $match: { _id: gordId } },
//     { $unwind: "votes" },
//     {
//       $group: {
//         _id: gordId,
//         voteTotal: { $sum: "votes.rating" },
//       },
//     },
//   ]);

//   {
//     gord,
//     voteTotal: totalGordVotes(req.params.gordId),
//   }

module.exports = {
  // Get all the gords and their total score
  getAllGords(req, res) {
    Gord.find()
      .select("-__v")
      .then((gords) => res.json(gords))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single Gords and their total scores
  getSingleGord(req, res) {
    Gord.findOne({ _id: req.params.gordId })
      .select("-__v")
      .then((gord) =>
        !gord
          ? res.status(404).json({ message: "No Gord Found" })
          : res.json(gord)
      )
      .catch((err) => res.status(500).json(err));
  },

  createVote(req, res) {
    console.log(req.params);
    console.log(req.body);
    Gord.findOneAndUpdate(
      { _id: req.body.gordId },
      { $addToSet: { votes: req.body } },
      { new: true }
    )
      .then((gord) => {
        !gord
          ? res.status(404).json({ message: "Could not add your vote" })
          : res.json(gord);
      })

      .catch((err) => {
        res.status(500).json(err);
        console.log(err);
      });
  },
};
