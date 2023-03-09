const { ObjectId } = require("mongoose").Types;
const { Gord } = require("../models");

// const totalGordVotes = (gordId) =>
const totalRatingPerGord = async (gordId) =>
  Gord.aggregate([
    { $match: { _id: ObjectId(gordId) } },
    {
      $unwind: "$votes",
    },
    {
      $group: {
        _id: null,
        total_ranking: { $sum: "$votes.rating" },
      },
    },
  ]);

module.exports = {
  getAllGords(req, res) {
    Gord.aggregate(
      [{ $sample: { size: 8 } }],

      (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(result);
        }
      }
    );
  },

  getAllVotes(req, res) {
    Gord.aggregate(
      [
        {
          $set: {
            vote_sum: {
              $sum: "$votes.rating",
            },
          },
        },
      ],
      (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).send(result);
        }
      }
    );
  },

  // Get a single Gords and their total scores
  getSingleGord(req, res) {
    Gord.findOne({ _id: req.params.id })
      .select("-__v")
      .then(async (gord) =>
        !gord
          ? res.status(404).json({ message: "No Gord Found" })
          : res.json({
              gord,
              totalRatingPerGord: await totalRatingPerGord(req.params.id),
            })
      )
      .catch((err) => res.status(500).json(err));
  },

  createVote(req, res) {
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
