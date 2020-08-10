const validator = require('validator')
const mongoose = require('mongoose')

const user = mongoose.model('user', {
    name: {
        type: 'string',
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowerCase: true,
        validate(email) {
            if (!validator.isEmail(email)) {
                throw new Error('not a valid email')
            }
        }
    },
    password: {
        type: String,
        trim: true,
        minlength: 7,
        required: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain the word "password"')
            }
        }
    },
    age: {
        type: 'Number',
        default: 0,
        validate(value) {
            if (value < 0){
                throw new Error('Age cannot be negative')
            }
        }
    }
})

module.exports = user