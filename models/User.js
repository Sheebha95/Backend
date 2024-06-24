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
    },
    description: {
        type: String,
        max:50
    },
    city: {
        type: String,
        max: 20
    },
    country: {
        type: String,
        max: 15
    },
    relationship: {
        type: Number,
        enum: [1,2,3]
    }

}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema)