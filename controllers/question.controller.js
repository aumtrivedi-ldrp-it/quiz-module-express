var question_master = require("../models/question_master.model");
var answer_master = require("../models/answer_master.model");
var quiz_master = require("../models/quiz_master.model");
var mapping_master = require("../models/mapping_master.model");
const _ = require('lodash');

exports.createquiz = function (req, res) {
   res.send('Product Created successfully')
};

//Add question records
var addQuestion = function (req, res) {

   var add_ques_req_body = req.body;
   var add_question = new question_master({
      question_title: add_ques_req_body.question_title,

   });
   question_master(add_question).save(function (err, result) {
      if (err) {
         console.log(err);
      }

      else {
         let temp_arr = [];

         for (let i = 0; i < 4; i++) {
            let temp_obj = {};

            temp_obj.ans_text = req.body['option' + i];
            if (add_ques_req_body.correctans == "option" + i) {
               temp_obj.isCorrect = true;
            } else {

               temp_obj.isCorrect = false;
            }

            temp_obj.ques_id = result._id;
            temp_arr.push(temp_obj);

         }
         answer_master.insertMany(temp_arr, function (err, result) {
            if (err) {
               console.log(err);
            } else {
               res.send(result);
               res.end();
            }
         })

      }
   });

};
exports.addQuestion = addQuestion;


//Edit existing questions records
var editQuestion = function (req, res) {
   var edit_ques_req_body = req.body;

   question_master.findOneAndUpdate({
      _id: req.params.id

   }, {
         $set: {
            question_title: edit_ques_req_body.question_title
         }
      },

      function (err, data) {

         if (err) {
            console.log("error occured");
         }
         else {

            var find_and_edit_ans = answer_master.find({ "ques_id": data._id });

            find_and_edit_ans.exec(function (err, story) {
               if (err) {
                  res.send(err);
               }
               else {

                  let store_edit_temp_obj = [];

                  for (var i = 0; i < story.length; i++) {
                     let edit_temp_obj = {
                           updateOne: { filter: { "_id": story[i]._id },
                              update: {
                                 $set:
                                  { 
                                      ans_text: edit_ques_req_body['option' + i]}
                                  }
                        }
                     }
                      
                     if (edit_ques_req_body.correctans == "option" + i) 
                     {
                        edit_temp_obj.updateOne.update.$set.isCorrect=true
                     }

                     else {
                        edit_temp_obj.updateOne.update.$set.isCorrect=false
                     }
                     store_edit_temp_obj.push(edit_temp_obj)
                  }

                  answer_master.bulkWrite(store_edit_temp_obj, function (error_response, edit_response) {
                     if (error_response) {

                        console.log("result", error_response);
                     }
                     else {
                        res.send(edit_response);

                     }
                  })
               }
            });
         }
      }
   )
};
exports.editQuestion = editQuestion;




//Delete question
var deleteQuestion = function (req, res) {
   question_master.findOneAndRemove({
      _id: req.params.id
   }, function (err, question_master__remove_result) {
      if (err) {
         res.send('Error in deletequestion question_master')
      } else {
         answer_master.remove({
            ques_id: req.params.id
         }, function (err, answer_master_remove_result) {
            if (err) {
               res.send('Error in deletequestion question_master')
            } else {
               mapping_master.remove({
                  question: req.params.id

               }, function (err, mapping_master_remove_result) {
                  res.send(mapping_master_remove_result);
               })

            }
         });
      }
   });
};
exports.deleteQuestion = deleteQuestion;


//Show question
var showQuestion = function (req, res) {
   question_master.find({
     
   }, function (err, question_master_result) {
      if (err) {
         res.send('Error in deletequestion question_master')
      } else {
        res.json(question_master_result)
      }
   });
};
exports.showQuestion = showQuestion;


//Show question
var quiz = function (req, res) {
  mapping_master.find().populate("quiz").populate("question").lean().exec(function(err,get_populate_result){
    
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
exports.quiz = quiz;