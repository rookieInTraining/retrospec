const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const retroPointSchema = new Schema({
    message: {type: String, required: true},
    bucket: {type: String, required: true},
    dashboardId: {type: String, required: true},
    createdTime: {type: Date},
    deleted: {type: Boolean, default: false}
});

const RetroSpec = model('retropoint', retroPointSchema);
module.exports = RetroSpec