const mongoose = require("mongoose");
const Birthday = require("../../src/mongoose/models/birthdays");

//dummy data
const birthdays = [
    {
        name: "dummy_one",
        dob: "1994-05-23T00:00:00.000Z",
        relationship: "Brother"
    },
    {
        name: "dummy_two",
        dob: "1996-01-21T00:00:00.000Z",
        relationship: "Sister"
    },
    {
        name: "dummy_three",
        dob: "1992-06-08T00:00:00.000Z",
        relationship: "Sister"
    },
    {
        name: "dummy_four",
        dob: "2000-03-13T00:00:00.000Z",
        relationship: "Friend"
    },
    {
        name: "dummy_five",
        dob: "1998-08-16T00:00:00.000Z",
        relationship: "Brother"
    },
    {
        name: "dummy_six",
        dob: "1999-10-28T00:00:00.000Z",
        relationship: "Friend"
    },
    {
        name: "dummy_seven",
        dob: "1991-12-26T00:00:00.000Z",
        relationship: "Cousin"
    },
    {
        name: "dummy_eight",
        dob: "1988-11-08T00:00:00.000Z",
        relationship: "Friend"
    },
    {
        name: "dummy_nine",
        dob: "1997-02-01T00:00:00.000Z",
        relationship: "Friend"
    },
    {
        name: "dummy_ten",
        dob: "2000-01-18T00:00:00.000Z",
        relationship: "Friend"
    }
];

const setUpDatabase = async () => {
    await Birthday.deleteMany();
    for(let i = 0; i < birthdays.length; i++) {
        await new Birthday(birthdays[i]).save();
    }
}

module.exports = {
    birthdays,
    setUpDatabase
}