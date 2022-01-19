const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    user:  {
        type: String,
        requires: true,
    },
    password:  {
        type: String,
        requires: true,
    },
    firstname:  {
        type: String,
        requires: true,
    },
    lastname: {
        type: String,
        requires: true,
    },
    age: String,
    nationality: String,
    profession: String,
    date:{
        type: Date,
        default: Date.now
    }
}, {
    timestamps:true
});

module.exports = model('users', userSchema);