const User = require("../model/schema/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require('dotenv').config({
    path: "../.env"
});


const users = [
  {
    fullName: "Test User", 
    phoneNumber: "+923338880651", 
    address: "Islamabad, Pakistan", 
    email: "mjunaid.swe@gmail.com", 
    password: "aaa"
  }, 
];



const DATABASE_URL = process.env.DB_URL || "mongodb://127.0.0.1:27017";
const DATABASE = process.env.DB || "xpertfirst_test";

const DB_OPTIONS = {
  dbName: DATABASE,
};

mongoose.set("strictQuery", false);
mongoose.connect(DATABASE_URL, DB_OPTIONS).catch((error) => {
  process.exit(1);
});

function insertUsers() {

    users.forEach(async (user) => {
       const newUser = new User({...user});
       await newUser.save(); 
    })
}

insertUsers(); 