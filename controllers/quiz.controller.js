var quiz_master = require("../models/quiz_master.model");
var mapping_master = require("../models/mapping_master.model");
var answer_master = require("../models/answer_master.model");
const _ = require('lodash');

var addQuiz = function (req, res) {

    var req_quiz_body = req.body;
    console.log(req_quiz_body.quiz_category);
    var add_quiz = new quiz_master({
        quiz_category: req_quiz_body.quiz_category
    });
    quiz_master(add_quiz).save(function (err, quiz_result) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(quiz_result);
        }

    });
};
exports.addQuiz = addQuiz;


//Edit Quiz
var editQuiz = function (req, res) {

    quiz_master.findOneAndUpdate({
        _id: req.params.id,

    }, {
            $set: {
                quiz_category: req.body.quiz_category,
            }
        },

        function (err, get_edit_quiz_result) {
            console.log(get_edit_quiz_result)
            if (err) {
                console.log("error occured");
            }
            else {

                res.send(get_edit_quiz_result)
            }
        })
};
exports.editQuiz = editQuiz;


var deleteQuiz = function (req, res) {

    quiz_master.findOneAndRemove({
        _id: req.params.id
    }, function (err, book) {
        if (err) {
            res.send('error removing')
        } else {

            mapping_master.remove({
                quiz: req.params.id
            }, function (err, get_delete_quiz_result) {
                res.send(get_delete_quiz_result)

            })


        }
    });
};
exports.deleteQuiz = deleteQuiz;


var quizDetails = function (req, res) {
   
            mapping_master.find({ 'quiz': req.params.id }).populate("quiz").populate("question").lean().exec(function(err,get_populate_result){
    
                get_populate_result.forEach((element, x) => {
                   console.log(element)
                   answer_master.find({ 'ques_id': element.question._id })
                       .then(result => {
                          console.log(result)
                           if (!_.isEmpty(result)) {
                               element.ans_text = result;
                           }
                           console.log(get_populate_result.length);
                           if (x == (get_populate_result.length - 1)) {
                               res.send(get_populate_result);
                           }
                       })
               })
               })
        
    
};
exports.quizDetails = quizDetails;