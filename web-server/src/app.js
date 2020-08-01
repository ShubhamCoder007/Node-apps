const path = require('path')
const express = require('express')

const pubPath = path.join(__dirname, '../public/')

const app = express()

app.use(express.static(pubPath))

// app.get('', (req, res) => {
//     res.send('Welcome page')
// })

// app.get('/help', (req, res) => {
//     res.send('help page')
// })

// app.get('/about', (req, res) => {
//     res.send('<title>About page</title>')
// })

app.get('/weather', (req, res) => {
    res.send({
        temperature: 33,
        humidity: 30
    })
})



app.listen(3000, () => {
    console.log('Web server started on 3000...')
})
