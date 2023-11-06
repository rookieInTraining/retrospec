const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const dashboardSchema = new Schema({
    name: {type: String, required: true},
    createdTime: {type: Date},
    deleted: {type: Boolean, default: false}
});

const Dashboard = model('dashboard', dashboardSchema);
module.exports = Dashboard