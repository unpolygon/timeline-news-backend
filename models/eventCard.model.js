const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eventCardSchema = new Schema({
    topic: {type:String, index: true, required: true},
    title: String,
    publish_date: Date,
    url: String,
    ners: [String]
});

eventCardSchema.index({ topic: 1 });
const eventCard = mongoose.model('eventCard', eventCardSchema);

module.exports = eventCard;