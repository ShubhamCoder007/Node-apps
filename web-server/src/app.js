const path = require('path')
const express = require('express')
const fs = require('fs')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//paths 
const pubPath = path.join(__dirname, '../public/')
const viewPath = path.join(__dirname, '../templates/views/')
const partialsPath = path.join(__dirname, '../templates/partials/')

const app = express()

//adding handlebar, key value pair
//handle bar configurations
app.set('views', viewPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//setting up directory for servicing
app.use(express.static(pubPath))

//setting routes to serve up the hbs file in view which is a handlebar for
//serving dynamic web content
app.get('', (req, res) => {
    //passing value to render to the file
    res.render('index', {
        title : 'Weather App',
        name: 'Shubham Banerjee'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shubham Banerjee'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page!',
        msg: 'How may I help you?',
        name: 'Shubham Banerjee'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error this is not the correct help url',
        msg: 'Help page could not be found',
        name: 'Shubham Banerjee'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a valid address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send(error)
        } else {
            forecast(latitude, longitude, (error, forecast) => {
                if(!error) {
                    return res.send({
                        forecast: forecast,
                        location: location
                    })
                }
                return res.send(error)
            })
        }
    })

})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Page you are trying to access is wrong!',
        msg: '404 page not found',
        name: 'Shubham Banerjee'
    })
})



app.listen(3000, () => {
    console.log('Web server started on 3000...')
})
