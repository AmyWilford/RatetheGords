// Should this be a model or a type?
const { Schema, model } = require("mongoose");

// Create a vote 
const voteSchema = new Schema(
  {
    rating: Number,
    require: true,
    default: 0,
    min: 0, 
    max: 5,
    dateCreated: {
        type: Date, 
        default: Date.now
    }
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
