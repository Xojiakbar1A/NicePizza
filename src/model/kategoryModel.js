const mongoose = require("mongoose");

const kategorySchema = new mongoose.Schema({
    kategoryName: {
        type: String,
        required: true
    },
    kategoryImg:{
        type: Object,
        default: {},
    },
},
{
    timestamps: true
});

module.exports = mongoose.model("Kategory", kategorySchema);
