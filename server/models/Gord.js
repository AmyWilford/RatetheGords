const { Schema, model } = require("mongoose");
const voteSchema = require("./Vote");

const gordSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    imageSrc: {
      type: String,
    },
    votes: [voteSchema],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

gordSchema.virtual("voteCount").get(function () {
  return this.votes.length;
});

// gordSchema.virtual("voteTotal").get(function () {
//   let totalVotes;
//   console.log(this.votes[1].rating)  
//     // console.log(this.votes[i].rating)
//     return totalVotes += this.votes[i].rating;

// });

const Gord = model("gord", gordSchema);

module.exports = Gord;

// const { Schema, model } = require("mongoose");
// // const Vote = require('./Vote');

// const gordSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   bio: {
//     type: String,
//   },
//   imageSrc: {
//     type: String
//   },
//   votes: [Votes],
// });

// // make virtual for vote length

// // initialize gord model
// const Gord = model("gord", gordSchema);

// // Export Gord Model
// module.exports = Gord;
