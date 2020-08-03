console.log('Client side server...')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const p1 = document.querySelector('.p1')
const p2 = document.querySelector('#p2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = search.value
    const url = 'http://localhost:3000/weather?address='+location

    p1.textContent = "loading..."
    p2.textContent = "please wait..."

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                p2.textContent = data.error
            } else {
                p1.textContent = data.location
                p2.textContent = data.forecast
            }
        })
    })

})