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


//maintenance mode 503
// app.use((req, res, next) => {
//     res.status(503).send('Service is temporarily unavailable!')
// })


//registering the routers
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Listening on ',port)
})


// const main = async () => {
//     const task = await Task.findById('5f392bee3fd3314f04879ece')
//     // console.log(await User.findById(task.owner).then(u => console.log(u.name)))
//     await task.populate('owner').execPopulate()
//     console.log(task.owner.name)
// }

// main()