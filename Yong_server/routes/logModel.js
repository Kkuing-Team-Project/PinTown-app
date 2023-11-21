// logModel.js
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const logSchema = new Schema({ 
    num: String,
    getNumber: String
});

const LogModel = mongoose.model('log', logSchema);

module.exports = LogModel;
