const Workout = require('../models/Workout.js')
const mongoose = require('mongoose')

//Get all workout
const getAllWorkout = async (req, res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1})

    res.status(200).json(workouts)
}

//Get single workout
const getWorkout = async (req, res) => {
    const { id } = req.params //:id

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findById(id)

    if(!workout){
        return res.status(404).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}


//Create new workout
const createWorkout = async (req, res) => {
    const { title, load, reps } = req.body

    let emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 1){
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields})
    }

    // Add doc to DB
    try{
        const workout = await Workout.create({ title, load, reps })
        res.status(200).json(workout)
    }catch(error){
        res.status(404).json({error: error.message})
    }
}

//Delete a workout
const deleteWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    if(!workout){
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}

//Update a workout
const updateWorkout = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'})
    }

    const workout = await Workout.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!workout){
        return res.status(400).json({error: 'No such workout'})
    }

    res.status(200).json(workout)
}


module.exports = {
    getAllWorkout,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}