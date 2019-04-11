var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MappingMasterSchema = new Schema({
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'quiz_master'
  },
  question: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'question_master'
  },

});

module.exports = mongoose.model("mapping_master", MappingMasterSchema);