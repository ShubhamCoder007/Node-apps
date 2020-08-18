const express = require('express')
const router = new express.Router()
const Task = require('../db/models/task')
const { update } = require('../db/models/task')
const Auth = require('../middleware/Authentication')
const auth = require('../middleware/Authentication')


//refactored with async and await
router.post('/task', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        //spread operator which opens out all the iterable data
        ...req.body,
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send()
    } catch(e) {
        res.status(400).send()
    }
})

//reading all the tasks
//getting the task based on completed filtering
//if no query is provided then all tasks are returned
router.get('/tasks', Auth, async (req, res) => {
    const match = {}

    if(req.query.completed) {
        //string to be converted to boolean
        match.completed = req.query.completed === 'true'
    }

    try {
         //using the populate aproach which will temporarily store in virtual space
        await req.user.populate({
            path: 'tasks',
            match
        }).execPopulate()
        // const tasks = await Task.find({ owner: req.user._id })
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

//read task of particular id
router.get('/tasks/:id', Auth, async (req, res) => {
    const _id = req.params.id

    try {
        const taske = await Task.findOne({ _id, owner: req.user._id})
         
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', Auth, async (req, res) => {
    //match up the attributes in body, if they dont match then throw error
    const updates = Object.keys(req.body)
    const validUpdates = ['description', 'completed']
    const isValidUpdate = updates.every(update => {
        return validUpdates.includes(update)
    })

    if (!isValidUpdate) {
        return res.status(400).send({error: 'Not a valid update!', hint: 'allowed updates: '+validUpdates})
    }

    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

        if (!task) {
            res.status(404).send()
        }
        updates.forEach(update => task[update] = req.body[update])
        res.send(task)
    } catch (e) {
        res.status(400).send()
    }

})


router.delete('/tasks/:id', Auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router