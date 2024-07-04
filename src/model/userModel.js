const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    phone: {
        type: String,
        required:true
    },
    year: {
        type:String,
        required:true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Users", userSchema);
