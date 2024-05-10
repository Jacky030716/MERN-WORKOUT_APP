const express = require('express')
const Workout = require('../models/Workout.js')
const { 
    createWorkout,
    getAllWorkout,
    getWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutControllers')
const requireAuth = require('../middleware/requireAuth.js')

const router = express.Router()

// Require auth for all workout routes
router.use(requireAuth)

// Get all workouts
router.get('/', getAllWorkout)

// Get a single workout
router.get('/:id', getWorkout)

// Post a new workout
router.post('/', createWorkout)

// Delete workout
router.delete('/:id', deleteWorkout)

// Update a workout
router.patch('/:id', updateWorkout)

module.exports = router