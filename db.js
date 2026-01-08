const mongoose = require('mongoose')

const mongoUrl = 'mongodb://localhost:27017/practice'

mongoose.connect(mongoUrl)

const db = mongoose.connection

db.on('connected', () => {
    console.log('Mongoose connected to ' + mongoUrl)
})

db.on('disconnected', () => {
    console.log('Mongoose disconnected')
})

db.on('error', (err) => {
    console.log('Mongoose error : ' + err)
})

module.exports = db