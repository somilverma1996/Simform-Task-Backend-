const mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
    questions:[],
    formname: String,
    responses: [],
}, {
    timestamps: true
});

module.exports = mongoose.model('question', QuestionSchema);
