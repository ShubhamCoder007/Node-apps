const express = require('express')
const router = new express.Router()
const Task = require('../db/models/task')


//refactored with async and await
router.post('/task', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send()
    } catch(e) {
        res.status(400).send()
    }
})

//reading all the tasks
router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({ })
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

//read task of particular id
router.get('/tasks/:id', async (req, res) => {
    const id = req.params.id

    try {
        const task = await Task.findById(id)
         
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', async (req, res) => {
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
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!task) {
            res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(400).send()
    }

})


router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)

        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router