const express = require('express')
const router  = express.Router()
const Clg = require('../models/clgschema')

router.post('/', async(req,res) => {
    try{
        const user = req.body
        const clg = new Clg(user)
        const response = await clg.save()
        console.log('data saved')
        res.status(200).json(response)
    }
    catch(err){
        console.log(err)
        res.status(200).json({'Internal Server Error' : err})
    }
})

router.get('/', async(req,res) => {
    try{
        const data = await Clg.find()
        console.log('data fetched')
        res.status(200).json(data)
    }
    catch(err){
        console.log(err)
        res.status(500).json({'Internal Server Error' : err})
    }
})

router.get('/:course', async(req,res) => {
    try{
        const coursee = req.params.course
        const data  = await Clg.find({course : coursee})
        if(coursee == 'Btech' || coursee == 'BCA' || course == 'BSc'){
            console.log('data fetched')
            res.status(200).json(data)
        }
        else{
            res.status(404).json({'Error' : 'Course not found'})
        }
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
        const response = await Clg.findByIdAndUpdate(idd, data, {
            new : true,
            runValidators : true
        })
        if(!response){
            res.status(404).json({'Error' : 'User not found'})
        }
        console.log('data Updated')
        res.status(200).json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({'Internal Server Error' : err})
    }
})


router.delete('/:id', async(req,res) => {
    try{
        const idd = req.params.id
        const data = await Clg.findByIdAndDelete(idd)
        if(!data){
            res.status(404).json({'Error': 'User not found'})
        }
        console.log('data deleted')
        res.status(200).json(data)
    }
    catch(err){
        console.log(err)
        res.status(500).json({'Internal Server Error' : err})
    }
})

module.exports = router