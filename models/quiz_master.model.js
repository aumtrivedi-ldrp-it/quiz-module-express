var mongoose = require("mongoose");
var schema = mongoose.Schema;
var quiz_master_schema = new schema({
	quiz_category: String,
});

module.exports = mongoose.model("quiz_master", quiz_master_schema);