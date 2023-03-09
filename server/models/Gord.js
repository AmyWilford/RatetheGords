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

const Gord = model("gord", gordSchema);

module.exports = Gord;
