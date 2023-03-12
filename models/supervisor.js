const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const supervisorSchema = new Schema({
    id: Number,
    employee: {
        type: Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true
    }
});

supervisorSchema.plugin(AutoIncrement, {inc_field: 'id'})

module.exports = mongoose.model("Supervisor", supervisorSchema);