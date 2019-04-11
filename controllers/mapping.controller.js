var mapping_master = require("../models/mapping_master.model");


exports.attachQuiz = function (req, res) {

    var mapping_req_body = req.body;

    var addquiz = new mapping_master({
        quiz: mapping_req_body.quizid,
        question: mapping_req_body.questionid,
    });

    mapping_master(addquiz).save(function (err, mapping_master_result) {
        if (err) {
            return handleError(err);
        } else {
            res.send(mapping_master_result);
        }
    });
};

exports.detachQuiz = function (req, res) {
    var mapping_req_body = req.body;

    mapping_master.remove({ question: mapping_req_body.questionid, quiz: mapping_req_body.quizid }, function (err, result) {
        if (err) {
            return handleError(err);
        } else {
            res.send(result)
        }
    });
};
