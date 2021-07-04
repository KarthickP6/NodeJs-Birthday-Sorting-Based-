const mongoose = require("mongoose");

//set up validations as mentioned in the problem statement

//setting up the birthday card schema
const birthdaySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        default: new Date(),
    },
    relationship: {
        type: String,
        required: true
    }
});

const Birthday = mongoose.model("Birthday", birthdaySchema);

module.exports = Birthday;