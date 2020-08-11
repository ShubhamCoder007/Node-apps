const express = require('express')
const User = require('./db/models/user')
require('./db/mongoose')
const Task = require('./db/models/task')
const mongoose = require('mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

const port = process.env.PORT || 3000

//automatically looks and parses for json
app.use(express.json())

//registering the routers
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Listening on ',port)
})