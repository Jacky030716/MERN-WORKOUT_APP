require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')

const app = express()

//Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

//Routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

//Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //Listen for request
        app.listen(process.env.PORT, () => {
            console.log("Listening on port", process.env.PORT);
        })
    })
    .catch((error) => {
        console.log(error);
    })

