const mongoose = require("mongoose");

const selectedSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    mainFoodId: {
        type: String,
        required: true
    },
    additionFood: {
        type: Number,
        required:true
    },
    takeDownFood:{
        type: String,
        default: ''
    },
    commonPrice:{
        type: String,
        required: true
    },
    sizeFood:{
        type: String,
        required:true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Select", selectedSchema);
