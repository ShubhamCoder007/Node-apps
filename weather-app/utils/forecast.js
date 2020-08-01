const request = require('request')

const forecast = (lat, long, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=297e8f2b399e735fc7725bea9ed20999&query='+lat+','+long

    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the service!', undefined)
        } else if (body.error) {
            callback('Cannot find the location...', undefined)
        } else {
            const current = body.current 
            const str = current.weather_descriptions[0]+'. currently it is: '+current.temperature+' C  It feels like '+current.feelslike
            callback(undefined, str)
        }
    })
}


module.exports = forecast;