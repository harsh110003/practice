const express = require('express')
const app = express()
const db = require('./db')
const bodyparser = require('body-parser')
app.use(bodyparser.json())
const clgRoute  = require('./routes/clgRoute')
const personRoute = require('./routes/personRoute')


app.use('/clg', clgRoute)
app.use('/person', personRoute)

app.listen(3000 , () => {
    console.log('Listning on port 3000')
})