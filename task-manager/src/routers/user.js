const express = require('express')
const router = new express.Router()
const User = require('../db/models/user')

router.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).then(reject => {
        res.status(400).send(reject)
    })
})

router.get('/users', (req, res) => {
    User.find({}).then(users => {
        res.send(users)
    }).catch(error => {
        res.status(500).send(error)
    })
})

router.get('/users/:id', (req, res) => {
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

//updating the user data
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'age', 'email', 'password']
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update))

    if (!isValidUpdate) {
        res.status(400).send({ error: 'Invalid operations!'})
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router