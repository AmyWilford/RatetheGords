const {Schema, model} = require('mongoose');
const Vote = require('./Vote');

const gordSchema = new Schema(
    {
        name: {
            type:String, 
            bio: String, 
            image: String, 
            required: true
        }, 
            votes: [Vote]
    },
);

// make virtual for vote length

// initialize gord model
const Gord = model('gord', gordSchema);

// Export Gord Model
module.exports = Gord;