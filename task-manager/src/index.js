const express = require('express')
const User = require('./db/models/user')
require('./db/mongoose')
const Task = require('./db/models/task')

const app = express()

const port = process.env.PORT || 3000

//automatically looks and parses for json
app.use(express.json())

app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).then(reject => {
        res.status(400).send(reject)
    })
})

app.post('/task', (req, res) => {
    const task = new Task(req.body)

    task.save().then(() => {
        res.status(201).send(task)
    }).catch(error => {
        res.status(400).send(error)
    })
})

app.listen(port, () => {
    console.log('Listening on ',port)
})