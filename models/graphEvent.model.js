const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const graphSchema = new Schema({
    topic: {type:String, index: true, required: true},
    title: String,
    date: Date,
    event: String,
    id:	Number,
    sentence: String,
    clause: String,
    dateText: String,
    exactDate: Boolean,
    paragraphNo: Number,
    realDate: Boolean,
    endDate: Date,
    url: String,
    nodeId: Number
});

graphSchema.index({ topic: 1, date: 1});
const graphEvent = mongoose.model('graphEvent', graphSchema);

module.exports = graphEvent;