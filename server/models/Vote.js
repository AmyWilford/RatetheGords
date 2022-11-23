// Should this be a model or a type?
const { Schema, Types, model } = require("mongoose");
const Gord = require("./Gord");

// Create a vote
// QUESTION DO I HAVE NEED OT LINK TO A GORD?
// Each vote can have one gord - but each gord can have many votes
const voteSchema = new Schema(
  {
    rating: {
      type: Number,
      require: true,
      default: 0,
      min: 0,
      max: 5,
      dateCreated: {
        type: Date,
        default: Date.now,
      },
    },
    gordId: {
      type: Schema.Types.ObjectId,
    },
  },

//   {
//     toJSON: {
//       virtuals: true,
//     },
//   }
);

// Get total number of votes placed
// voteSchema.virtual("totalVotesPlaced").get(function () {
//   return this.rating.length;
// });

const Vote = model("vote", voteSchema);

module.exports = Vote;
