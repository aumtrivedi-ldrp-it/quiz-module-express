const express = require('express');
const router = express.Router();

const question_controller = require('../controllers/question.controller');
const quiz_controller = require('../controllers/quiz.controller');
const mapping_controller = require('../controllers/mapping.controller');


router.post('/add-question', question_controller.addQuestion);
router.put('/edit-question/:id', question_controller.editQuestion);
router.delete('/delete-question/:id', question_controller.deleteQuestion);
router.post('/add-quiz', quiz_controller.addQuiz);
router.put('/edit-quiz/:id', quiz_controller.editQuiz);
router.delete('/delete-quiz/:id', quiz_controller.deleteQuiz);
router.post('/attach-quiz', mapping_controller.attachQuiz);
router.delete('/detach-quiz', mapping_controller.detachQuiz);
router.get('/quiz-details/:id', quiz_controller.quizDetails);
router.get('/show-question', question_controller.showQuestion);
router.get('/quiz', question_controller.quiz);

module.exports = router;


