const { Schema, model } = require("mongoose");
const voteSchema = require('./Vote');

const gordSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  }, 
  imageSrc: {
    type: String
  },
  votes: [voteSchema],
});

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
