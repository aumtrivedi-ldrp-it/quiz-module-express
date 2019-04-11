var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const QuestionMasterSchema = new Schema({
	question_title: String,
});

module.exports = mongoose.model("question_master", QuestionMasterSchema);