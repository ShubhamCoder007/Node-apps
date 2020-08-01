const fs = require('fs')

//loading from the file, readFile returns buffer
const dataBuffer = fs.readFileSync('1-json.json');
console.log('raw read: ',dataBuffer)
//converting the buffer to string
const dataJson = dataBuffer.toString();
console.log("after toString: ",dataJson)
//parsing to json format
const user = JSON.parse(dataJson)
console.log('parsed: ',user)

//data manipulation
user.age = 18
user.name = 'Shubham Banerjee'

//string conversion before storing to file
const userJson = JSON.stringify(user)
console.log('sfy: ', userJson)

//updating the file
fs.writeFileSync('1-json.json',userJson)
