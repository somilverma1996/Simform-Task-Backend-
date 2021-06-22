const { response } = require('express');
const Question = require('../models/question.model.js');


exports.add = (req, res) => {
    console.log(req.body.questions)
    if (!req.body.questions) {
        return res.status(400).send({
            message: "Question can not be empty"
        });
    }

    const ques = new Question({
        questions: req.body.questions,
        formname: req.body.formname,
        responses: req.body.responses || []
    });

    ques.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the ques."
            });
        });
};

exports.getAll = async (req, res) => {
    try {
        let ques = await Question.find({});
        res.status(200).send(ques);
    }
    catch (err) {
        res.status(500).send({ error: err })
    }
};

exports.getById = async (req, res) => {
    try {
        let courseData = await Question.find({ _id: req.body.questions_id })
        console.log(courseData)
        res.status(200).send(courseData)
    }
    catch (err) {
        res.status(500).send({ error: err })
    }
};

exports.submitForm = async (req, res) => {
    try {
        const ques = await Question.findOne({ _id: req.body.questions_id });
        console.log(ques)
        let obj = ques
        obj["responses"] = [...ques.responses, req.body.questions];
        await Question.updateOne({ _id: req.body.questions_id }, obj)
        res.status(200).send("Response Added Sccesfully")
    }
    catch (err) {
        res.status(500).send({ error: err })
    }
};

