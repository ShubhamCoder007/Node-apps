require('./src/db/mongoose')
const Task = require('./src/db/models/task')

// Task.findByIdAndRemove('5f30fc799ae1d725a4bf242f').then(task => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then(result => {
//     console.log(result)
// }).catch(e => console.log(e))

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({completed: false})

    return count
}

deleteTaskAndCount('5f323f0dbf618e23f012f4ec').then(count => {
    console.log(count)
}).catch(e => {
    console.log(e)
})