const mongoose = require('mongoose')

const clgSchema = new mongoose.Schema({
    clgname : {
        type : String,
        required : true
    },
    join_Date : {
        type : Date
    },
    end_Date : {
        type : Date
    },
    course : {
        type : String,
        enum : ['Btech', 'BCA', 'BSc']
    }

})

const Clg = mongoose.model('Clg', clgSchema)

module.exports = Clg