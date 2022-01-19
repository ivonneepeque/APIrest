const { Schema, model } = require('mongoose');

const noteSchema = new Schema({
    title:  {
        type: String,
        requires: true,
    },
    content: {
        type: String,
        requires: true,
    },
    author: String,
    date:{
        type: Date,
        default: Date.now
    }

}, {
    timestamps:true
});

module.exports = model('notes', noteSchema);