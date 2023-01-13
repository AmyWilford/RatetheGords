const { ObjectId } = require("mongoose").Types;
const { Gord } = require("../models");
const { db } = require("../models/Gord");

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
  // Get all the gords and their total score
  // getAllGords(req, res) {
  //   Gord.find()
  //     .select("-__v")
  //     .then((gords) => res.json(gords))
  //     .catch((err) => res.status(500).json(err));
  // },
  getAllGords(req, res) {
    Gord.aggregate([{ $sample: { size: 8 } }], (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(result);
      }
    });
  },

  getAllVotes(req, res) {
    Gord.aggregate(
      [
        {$votes: {
          totalRanking: {$sum: "$rating"}
        }
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
    console.log(req);
    Gord.findOne({ _id: req.body.gordId })
      .select("-__v")
      .then(async (gord) =>
        !gord
          ? res.status(404).json({ message: "No Gord Found" })
          : res.json({ 
            gord, 
            totalRatingPerGord: await totalRatingPerGord(req.body.gordId),
           })
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
