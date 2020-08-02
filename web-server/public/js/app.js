const { response } = require("express")
const forecast = require("../../src/utils/forecast")

console.log('Client side server...')

fetch('http://localhost:3000/weather?address=japan').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            console.log(error)
        } else {
            console.log(data.forecast, data.location)
        }
    })
})