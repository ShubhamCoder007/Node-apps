const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

const connectionUrl = 'mongodb://127.0.0.1:27017'
const dbName = 'task-manager'

mongoClient.connect(connectionUrl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to the mongodb...')
    }
    console.log('connected to the mongodb server')

    const db = client.db(dbName)

    // db.collection('users').insertOne({
    //     name: 'Shubham Banerjee',
    //     age: 24
    // }, (error, result) => {
    //     if (error) {
    //         return console.log(error)
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('users').insertMany([{
    //     name: 'Disha',
    //     age: 16
    // }, {
    //     name: 'Koushiki Mukherjee',
    //     age: 21
    // }], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert...')
    //     }

    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([{
    //     description: 'Coding',
    //     completed: false
    // }, {
    //     description: 'Node js',
    //     completed: false
    // }, {
    //     description: 'clash royale',
    //     completed: true
    // }], (error, result) => {
    //     if (error) { 
    //         return console.log('Unable to insert...')
    //     }

    //     console.log(result.ops)
    // })


    //we can also search by objecy id, for that you need to new ObjectID('hexcode')
    // db.collection('users').findOne({ name: 'Disha'}, (error, user) => {
    //     if (error) {
    //         return console.log('unable to find')
    //     }

    //     console.log(user)
    // })

    //calling find() returns cursor object, now we can convert to the desired array object
    //by calling toArray() on it which takes a callback function as above
    // db.collection('users').find({ age: 24}).toArray((error, user) => {
    //     console.log(user)
    // })

    // db.collection('users').find({ age: 24}).count((error, count) => {
    //     console.log(count)
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
    //     if (error) {
    //         return console.log(error)
    //     } 
    //     tasks.forEach(task => {
    //         console.log(task._id)
    //     });
    // })


    //update
    // db.collection('users').updateOne({
    //     // _id: new ObjectId("5f29512f4814c73ad05fb99a")
    //     name: 'Shubham Banerjee'
    // },{
    //     $set: {
    //         name: 'Burman',
    //         age: 23
    //     }
    // })
    // .then((result) => {
    //     console.log(result)
    // })
    // .catch((error) => {
    //     console.log(error)
    // })


    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // })
    // .then((result) => {
    //     console.log(result)
    //     console.log(result.modifiedCount)
    // })
    // .catch((error) => {
    //     console.log(error)
    // })


    //delete
    db.collection('tasks').deleteOne({
        description: 'clash royale'
    })
    .then((result) => {
        console.log(result)
    })
    .catch(error => {
        console.log(error)
    })

    db.collection('users').deleteMany({
        age: 23
    })
    .then((result) => {
        console.log(result)
    })
    .catch(error => {
        console.log(error)
    })

})

