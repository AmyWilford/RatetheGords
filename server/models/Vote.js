// Should this be a model or a type?
const { Schema , Types } = require("mongoose");
// const Gord = require("./Gord");

const voteSchema = new Schema(
  {
    ratingId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    rating: {
      type: Number,
      require: true,
      // default: 0,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    }
  }
);

module.exports = voteSchema;
