const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    id: Number,
    name: String,
});

departmentSchema.plugin(AutoIncrement, {inc_field: 'id'});

module.exports = mongoose.model("Department", departmentSchema);