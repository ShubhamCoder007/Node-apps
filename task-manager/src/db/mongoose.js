const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser: true,
    useCreateIndex: true
})

const user = mongoose.model('user', {
    name: {
        type: 'string'
    },
    age: {
        type: 'Number'
    }
})

const user1 = new user({
    name: 'Shubham Banerjee',
    age: 24
})

user1.save()
.then(result => console.log(result))
.catch(error => console.log(error))

