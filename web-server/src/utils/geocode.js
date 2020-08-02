const request = require('request')

const geocode = (address, callback) => {
    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoic2h1YmxvY2siLCJhIjoiY2tkNzcybjR2Mm9hdzJxcXljMWMwOWNoeSJ9.PgUGM3My7EUBldsZf6OTCg&limit=1'

    request({url: geocodeURL, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to the location service', undefined)
        } else if (body.features.length === 0) {
            callback('Cannot find the location!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
            // callback(undefined, {latitude:123.23, longitude: 22.55})
        }
    })
}


module.exports = geocode;