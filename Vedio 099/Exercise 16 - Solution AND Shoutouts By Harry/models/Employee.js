const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        salary: {
            type: Number,
            required: true,
            min: 0,
        },
        language: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        isManager: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Employee = mongoose.model('Employee', employeeSchema);
module.exports =  Employee