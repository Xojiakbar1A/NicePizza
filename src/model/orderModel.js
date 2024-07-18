const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
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
    
},
{
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);
