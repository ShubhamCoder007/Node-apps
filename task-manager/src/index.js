const express = require('express')
const User = require('./db/models/user')
require('./db/mongoose')
const Task = require('./db/models/task')
const mongoose = require('mongoose')
const { find } = require('./db/models/user')

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

app.get('/users', (req, res) => {
    User.find({}).then(users => {
        res.send(users)
    }).catch(error => {
        res.status(500).send(error)
    })
})

app.get('/users/:id', (req, res) => {
    const id = req.params.id
    
    User.findById(id).then(user => {
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    }).catch(error => {
        res.status(500).send(error)
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

//reading all the tasks
app.get('/tasks', (req, res) => {
    Task.find({ }).then(tasks => {
        res.send(tasks)
    }).catch(error => {
        res.status(500).send(error)
    })
})

app.get('/tasks/:id', (req, res) => {
    const id = req.params.id

    Task.findById(id).then(task => {
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    }).catch(error => {
        res.status(500).send(error)
    })
})

app.listen(port, () => {
    console.log('Listening on ',port)
})