const mongoose = require("mongoose")



const UserSchema = new mongoose.Schema({
    username: {
        type:String,
        required:true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default:""
    },
    coverPicture: {
        type: String,
        default:""
    },
    followers: {
        type: Array,
        default:[]
    },
    followings: {
        type: Array,
        default:[]
    }

}, {timestamps: true})

mongoose.exports = mongoose.model("User", UserSchema)