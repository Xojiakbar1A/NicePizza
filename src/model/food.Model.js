const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true
    },
    foodPrice: {
        type: Number,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    foodImg:{
        type: Object,
        default: {},
    },
    kategoryId:{
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Food", foodSchema);
