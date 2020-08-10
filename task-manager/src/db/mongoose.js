const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser: true,
    useCreateIndex: true
})


// const user1 = new user({
//     name: 'Shubham Banerjee',
//     email: 'sb@AbortController.abc' ,
//     password: '   dfdf dfdfpassword'
// })

// user1.save()
// .then(result => console.log(result))
// .catch(error => console.log(error))




// const coding = new task({
//     description: 'Coding  '
//     // completed: false
// })

// coding.save()
// .then((result) => {
//     console.log(result)
// })
// .catch(error => {
//     console.log(error)
// })
