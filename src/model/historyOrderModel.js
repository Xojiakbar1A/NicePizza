const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
    selectedId: {
        type: String,
        required: true
    },
    foodId: {
        type: String,
        default: null
    },
    lastName:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required:true
    },
    delivery:{
        type: String,
        required:true,
        enum: ["delivery", "pickup"]
    },
    adres:{
        type: String,
        required:true,
    },
    payment:{
        type: String,
        default:"cash",
        enum: ["cash", "card","Apple-Pay"]
    },
    comeBackMony:{
        type: String,
        required:true,
        enum: ["Yes", "No"]

    },
    comment:{
        type: String,
        default:null,

    },
    totolMony:{
        type: String,
        required:true,
    },
    status:{
        type: String,
        default:"prossesing",
        enum: ["prossesing", "completed","cancel"]
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("History", historySchema);
