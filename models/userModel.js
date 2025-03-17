// var mongoose = require("mongoose");

// function getUserModel() {
//     var userScheema = mongoose.Schema;

//     var userColSchema = {
//         uid: { type: String, required: true, index: true, unique: true },
//         Addresss: String,
//         dos: { type: Date, default: Date.now },
//         phone: String,
//         fnamee: String,
//         lnamee: String,
//         tarea: String,
//         pincode: Number,
//         floor: String,
//         city: String,
//         state: String,
//         citeadd: String,
//         radioname: String,
//     }
//     var ver = {
//         versionKey: false, // to avoid __v field in table come by default
//     }
//     var UserColShema = new userScheema(userColSchema, ver);
//     var UserColRef = mongoose.model("Franchise", UserColShema);
//     //create collection in mongodb database

//     return UserColRef;
// }
// module.exports = { getUserModel }

const mongoose = require('mongoose');

const userColSchema = {
    uid: { type: String, required: true, index: true, unique: true },
    Addresss: String,
    dos: { type: Date, default: Date.now },
    phone: String,
    fnamee: String,
    lnamee: String,
    tarea: String,
    pincode: Number,
    floor: String,
    city: String,
    state: String,
    citeadd: String,
    radioname: String,
    status:Number,
};

const ver = {
    versionKey: false, // to avoid __v field in table come by default
};

const UserColSchema = new mongoose.Schema(userColSchema, ver);
const UserColRef = mongoose.model("Franchise", UserColSchema);

function getUserModel() {
    return UserColRef;
}

module.exports = { getUserModel };