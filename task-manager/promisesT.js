new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve('Success!')
        reject('Error!')
    }, 2000)
})
.then((result) => {
    console.log(result)
})
.catch((error) => {
    console.log(error)
})

//promises has two function resolve and reject one of which gets called on success or failure
//then upon the promise object gets called when it is resolved and successful
//catch for reject

