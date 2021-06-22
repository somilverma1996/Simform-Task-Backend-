module.exports = (app) => {
    const question = require('../controllers/question.controller.js');

    // Create a new question
    app.post('/questions/add', question.add);

    // Retrieve all question
    app.get('/questions/getAll', question.getAll);

    // Retrieve a single question with questionId
    app.post('/questions/getById', question.getById);

    // Update a Note with noteId
    app.put('/questions/submitForm', question.submitForm);

}
