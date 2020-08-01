// setTimeout(() => {
//     console.log('2 sec')
// }, 2000)

// const geocode = (add, callback) => {

//     setTimeout(() => {
//         const loc = {
//             lat: 0,
//             long: 0
//         }
    
//         callback(loc)
//     }, 3000)
// }

// geocode('a', (data) => {
//     console.log(data)
// })


//
// Goal: Mess around with the callback pattern
//
// 1. Define an add function that accepts the correct arguments
// 2. Use setTimeout to simulate a 2 second delay
// 3. After 2 seconds are up, call the callback function with the sum
// 4. Test your work!

const add = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b);
    }, 2000)
}

add(1, 4, (sum) => {
    console.log(sum) // Should print: 5
})

