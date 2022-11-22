const { Gord } = require("../models");

module.exports = {
  // Get all the gords and their total score
  getAllGords(req, res) {
    Gord.find()
      .select("-__v")
      .populate("votes")
      .then((gords) => res.json(gords))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single Gords and their total scores
  getSingleGord(req, res) {
    Gord.findOne({ _id: req.params.gordId })
      .select("-__v")
      .populate("votes")
      .then((gord) =>
        !gord
          ? res.status(404).json({ message: "No Gord Found" })
          : res.json(gord)
      )
      .catch((err) => res.status(500).json(err));
  },
};
