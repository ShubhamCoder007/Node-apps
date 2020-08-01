const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const yargs = require('yargs')

const add = process.argv[2]


// yargs.command({
//     command: 'weather',
//     describe: 'get weather forecast',
//     builder: {
//         add: {
//             describe: 'address field',
//             demandOption: true,
//             type: 'string'
//         }
//     },
//     handler() {
//         geocode(yargs.argv.add)
//     }
// })

// yargs.parse()

geocode(add, (error, data) => {
    const loc = data.location
    forecast(data.latitude, data.longitude, (error, data) => {
        if (error) {
            console.log('Some problems occured')
        } else {
            console.log(data,loc)
        }
    })
})