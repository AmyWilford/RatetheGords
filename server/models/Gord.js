const {Schema, model} = require('mongoose');
const Vote = require('./Vote');

const gordSchema = new Schema(
    {
        name: String, 
        bio: String, 
        image: String, 
        required: true
    }, 
    {
        votes: [Vote]
    },
    {
        toJSON: {
            virtuals: true,
        },
    },
);

gordSchema.virtual('totalVoteScore').get(function(){
    return this.
    // How to return sum of all votes
});
// initialize gord model
const Gord = model('gord', gordSchema);

// Export Gord Model
module.exports = Gord;