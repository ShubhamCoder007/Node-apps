const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(a+b)
        }, 2000)
    })
}

// add(1,2).then((sum) => {
//     console.log(sum)
//     //second call to async/ promise
//     add(sum, 3).then(sum2 => {
//         console.log(sum2)
//     }).catch(e => console.log(e))
// }).catch(e => {
//     console.log(e)
// })

//promise chaining to remove nesting problem
add(1, 2).then(sum => {
    console.log(sum)
    return add(sum, 3)
}).then(sum2 => {
    console.log(sum2)
}).catch(e => console.log(e))