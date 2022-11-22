// Should this be a model or a type?
const { Schema, model } = require("mongoose");
const voteSchema = new Schema(
  {
    voteRating: Number,
    require: true,
    default: 0,
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Get total number of votes placed
voteSchema.virtual("totalVotesPlaced").get(function () {
  return this.voteRating.length;
});
const Vote = model("vote", voteSchema);

module.exports = Vote;
