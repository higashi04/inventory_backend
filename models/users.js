const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;

const EmployeeUserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: String,
    lastName: String,
    position: String,
    id: Number,
    phone: String,
    hireDate: Date,
    active: Boolean,
    salary: Number
});
EmployeeUserSchema.plugin(AutoIncrement, {inc_field: 'id'});
EmployeeUserSchema.virtual('fullName').get( function() {
    return `${this.firstName} ${this.lastName}`
});
module.exports = mongoose.model("Employee", EmployeeUserSchema);