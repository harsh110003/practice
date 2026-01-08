const express = require('express')
const router = express.Router()
const Person = require('../models/personschema')
const {jwtAuth, generateToken} = require('./../jwt')

//registration
router.post('/signup', async(req,res) => {
    try{
        const user = req.body
        const person = new Person(user)
        const response = await person.save()
        console.log('data saved')
        const payload = {
            id : response.id,
            username : response.username
        }
        console.log(JSON.stringify(payload))
        const token = generateToken(payload)
        console.log('token is : ', token)
        res.status(200).json({response : response, token : token})
    }
    catch(err){
        console.log(err)
        res.status(500).json({'Internal Server Error' : err})
    }
})

//login
router.post('/login', async(req,res) => {
    try{
        const {username, password} = req.body
        const user = await Person.findOne({username : username})
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error : 'invalid username and password'})
        }
        const payload = {
            id : user.id,
            username : user.username
        }
        const token = generateToken(payload)
        res.json({token})
    }
    catch(err){
        console.log(err)
        res.status(500).json({'Internal Server Error' : err})
    }
})

//profile
router.get('/profile', jwtAuth, async(req,res) => { 
    try{
        const Userdata = req.user
        console.log('User data : ', Userdata)
        const idd = Userdata.id
        const data = await Person.findById(idd)
        res.status(200).json({data})
    }
    catch(err){
        console.error(err)
        res.status(500).json({"Internal Server Error" : err})
    }
})

router.get('/', jwtAuth, async(req,res) => {
    try{
        const data = await Person.find()
        console.log('data fetched')
        res.status(200).json(data)
    }
    catch(err){
        console.log(err)
        res.status(500).json({'Internal Server Error' : err})
    }
})

router.put('/:id', async(req,res) => {
    try{
        const idd = req.params.id
        const data = req.body
        const response = await Person.findByIdAndUpdate(idd, data, {
            new : true,
            runValidators : true
        })
        if(!response){
            res.status(404).json({'Error' : 'User not found'})
        }
        console.log('data updated')
        res.status(200).json({response})
    }
    catch(err){
        console.log(err)
        res.status(500).json({'Internal Server Error' : err})
    }
})

router.delete('/:id', async(req,res) => {
    try{
        const idd = req.params.id
        const response = await Person.findByIdAndDelete(idd)
        if(!response){
            res.status(404).json({'Error' : 'User not found'})
        }
        console.log('data deleted')
        res.status(200).json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({'Internal Server Error' : err})
    }
})

module.exports = router
