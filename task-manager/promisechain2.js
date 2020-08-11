require('./src/db/mongoose')
const Task = require('./src/db/models/task')

Task.findByIdAndRemove('5f30fc799ae1d725a4bf242f').then(task => {
    console.log(task)
    return Task.countDocuments({ completed: false })
}).then(result => {
    console.log(result)
}).catch(e => console.log(e))