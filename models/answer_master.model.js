var mongoose = require("mongoose");
var Schema = mongoose.Schema;
 
var AnswerMasterSchema = new Schema({
	
	ans_text:String,
	isCorrect:Boolean,
	ques_id:String, 
	 
});

module.exports = mongoose.model("answer_master_new", AnswerMasterSchema);