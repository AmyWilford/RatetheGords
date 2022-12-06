// const { Gord, Vote } = require("../models");

// module.exports = {
 
//   createVote(req, res) {
//     console.log("===== I AM CREATE VOTE=====");
//     Vote.create(req.body)
//       .then((vote) => {
//         return Gord.findOneAndUpdate(
//           { _id: req.body.gordId },
//           { $addToSet: { votes: vote._id } },
//           { new: true }
//         );
//       })
//       .then((gord) =>
//         !gord
//           ? res.status(404).json({
//               message: "We added your vote - but your gord does not exist",
//             })
//           : res.json("vote added")
//       )
//       .catch((err) => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   },
// };
