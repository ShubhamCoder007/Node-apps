require('./src/db/mongoose')
const User = require('./src/db/models/user')

User.findByIdAndUpdate('5f2a96c9117a883e2081a8f8', {
    $set: {
        age: 18
    }
}).then(user => {
    console.log(user)
    return User.countDocuments({ age: 18 })
}).then(result => {
    console.log(result)
}).catch(e => console.log(e))