const express = require('express')
const router = new express.Router()
const User = require('../db/models/user')
const { update } = require('../db/models/user')
const Auth = require('../middleware/Authentication')

router.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        res.status(201).send(user)
    }).catch(e => {
        res.status(400).send(e)
    })
})

router.get('/users/me', Auth, (req, res) => {
    res.send(req.user)
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


router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.getToken()
        res.send({user, token})
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})


router.post('/users/signup', async (req, res) => {
    const user = new User(req.body)
    const token = await user.getToken()
    await user.save()

    res.send({user, token})
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
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        const user = await User.findById(req.params.id)
        updates.forEach(update => user[update] = req.body[update])

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