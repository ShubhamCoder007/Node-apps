const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = mongoose.Schema({
    name: {
        type: 'string',
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})


//Hiding the private datas
userSchema.methods.toJSON = function () {
    const userObj = this.toObject()

    delete userObj.password
    delete userObj.tokens

    return userObj
}

//creating instance method
userSchema.methods.getToken = async function () {
    const token = await jwt.sign({_id: this._id.toString()}, 'developedbyshubhambanerjee')
    this.tokens = this.tokens.concat({ token })
    await this.save()

    return token
}


//creating findByCredentials custom method to find user by valid credentials
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login, the email doesnot exist!')
    }

    //verify the password
    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
        throw new Error('Unable to login, Invalid password!')
    }

    return user
}



//hashing the password before saving
userSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

//runs this middleware before deleting the user to remove all tasks
userSchema.pre('remove', async function(next) {
    await Task.deleteMany({owner: this._id})
    next()
})


const User = mongoose.model('user', userSchema)

module.exports = User