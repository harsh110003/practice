const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const personSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String
    }

})

personSchema.pre('save', async function(){
    const person = this
    if(!person.isModified('password')){ 
        return
    }
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(person.password,salt)
        person.password = hashedPassword
        return
    }
    catch(err){
        return(err)
    }
})

personSchema.methods.comparePassword = async function(userPass){
    return await bcrypt.compare(userPass, this.password)
}

const Person = mongoose.model('Person', personSchema)

module.exports = Person